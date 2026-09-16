#!/usr/bin/env node
/**
 * HubSpot setup for The COS Sprint (Fall 2026).
 *
 * Idempotent: every step checks for the item before creating it.
 * Reads the token from HUBSPOT_PRIVATE_APP_TOKEN. Never prints it.
 *
 * Usage:
 *   HUBSPOT_PRIVATE_APP_TOKEN=... node scripts/hubspot/setup-cos-sprint.mjs
 *
 * Creates:
 *   1a. Contact property group "COS Sprint" + 5 contact properties
 *   1b. Form "COS Sprint Interest (Fall 2026)"
 *   1c. Active list + static list
 *   1d. Deal pipeline "Cohorts"
 *   Reports whether workflows are available (does not build one).
 */

const TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
if (!TOKEN) {
  console.error('HUBSPOT_PRIVATE_APP_TOKEN is not set. Aborting.');
  process.exit(1);
}

const BASE = 'https://api.hubapi.com';
const PORTAL_ID = '243001979';
const NOTIFY_EMAIL = 'mark@sherpatech.ai';

const GROUP_NAME = 'cos_sprint';
const GROUP_LABEL = 'COS Sprint';
const FORM_NAME = 'COS Sprint Interest (Fall 2026)';
const ACTIVE_LIST_NAME = 'COS Sprint Interest (Fall 2026)';
const STATIC_LIST_NAME = 'SBAP AI Labs Fall 2026';
const STATIC_LIST_CONTACT_IDS = ['553208179447', '553142861498', '553091557098', '553144875755'];
const PIPELINE_LABEL = 'Cohorts';
const PIPELINE_STAGES = ['Interested', 'Payment link sent', 'Enrolled (paid)', 'Completed', 'Closed lost'];

const THANK_YOU =
  "You're on the list. We'll email you once the October dates are set, along with a payment link. " +
  'The first 10 sign-ups get a free 30-minute setup call, and we’ll reach out to schedule it.';

const summary = { properties: {}, form: null, lists: {}, pipeline: null, workflows: null, warnings: [] };

// ── HTTP helper ──────────────────────────────────────────────────────────────

async function api(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 600)}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function missingScope(err) {
  const msg = JSON.stringify(err?.data || {});
  const m = msg.match(/scopes?[^"]*?:\s*"?([a-z0-9._-]+)/i) || msg.match(/requires the ([a-z0-9._-]+) scope/i);
  return m ? m[1] : null;
}

function log(step, msg) {
  console.log(`[${step}] ${msg}`);
}

// ── 1a. Property group + properties ──────────────────────────────────────────

async function ensurePropertyGroup() {
  try {
    await api('GET', `/crm/v3/properties/contacts/groups/${GROUP_NAME}`);
    log('1a', `Property group "${GROUP_LABEL}" exists`);
  } catch (err) {
    if (err.status !== 404) throw err;
    await api('POST', '/crm/v3/properties/contacts/groups', { name: GROUP_NAME, label: GROUP_LABEL });
    log('1a', `Created property group "${GROUP_LABEL}"`);
  }
}

const PROPERTIES = [
  {
    name: 'cos_sprint_interest',
    label: 'COS Sprint interest',
    type: 'string',
    fieldType: 'text',
    description: 'Set to "Fall 2026" when the COS Sprint interest form is submitted.',
  },
  {
    name: 'cos_best_evenings',
    label: 'Best evenings',
    type: 'enumeration',
    fieldType: 'checkbox',
    description: 'Best evenings for a one-hour Zoom (COS Sprint).',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((d, i) => ({
      label: d,
      value: d,
      displayOrder: i,
      hidden: false,
    })),
  },
  {
    name: 'cos_biggest_bottleneck',
    label: 'Biggest bottleneck',
    type: 'string',
    fieldType: 'textarea',
    description: 'The one task that eats the most hours in their week (COS Sprint).',
  },
  {
    name: 'cos_email_platform',
    label: 'Email and calendar platform',
    type: 'enumeration',
    fieldType: 'select',
    description: 'Email and calendar platform (COS Sprint).',
    options: [
      { label: 'Google (Gmail + Google Calendar)', value: 'Google', displayOrder: 0, hidden: false },
      { label: 'Microsoft 365 (Outlook)', value: 'Microsoft 365', displayOrder: 1, hidden: false },
      { label: 'Other', value: 'Other', displayOrder: 2, hidden: false },
    ],
  },
  {
    name: 'cos_sprint_source',
    label: 'COS Sprint source',
    type: 'string',
    fieldType: 'text',
    description: 'Hidden form field. Where the COS Sprint sign-up came from (default sbap-lab1).',
  },
];

async function ensureProperties() {
  for (const p of PROPERTIES) {
    try {
      const existing = await api('GET', `/crm/v3/properties/contacts/${p.name}`);
      summary.properties[p.name] = `exists (${existing.type}/${existing.fieldType})`;
      log('1a', `Property ${p.name} exists`);
    } catch (err) {
      if (err.status !== 404) throw err;
      await api('POST', '/crm/v3/properties/contacts', { ...p, groupName: GROUP_NAME });
      summary.properties[p.name] = `created (${p.type}/${p.fieldType})`;
      log('1a', `Created property ${p.name}`);
    }
  }
}

async function checkLeadSource() {
  try {
    const ls = await api('GET', '/crm/v3/properties/contacts/lead_source');
    const ok = (ls.options || []).some((o) => o.value === 'Workshop / Webinar');
    summary.properties.lead_source = ok ? 'exists with "Workshop / Webinar"' : 'exists but value missing';
    if (!ok) summary.warnings.push('lead_source exists but has no "Workshop / Webinar" option; hidden field skipped.');
    return ok;
  } catch (err) {
    if (err.status === 404) {
      summary.properties.lead_source = 'missing';
      summary.warnings.push('lead_source property not found; hidden field skipped.');
      return false;
    }
    throw err;
  }
}

// ── 1b. Form ─────────────────────────────────────────────────────────────────

const CONTACT = '0-1';

function textField(name, label, fieldType, required, extra = {}) {
  return { objectTypeId: CONTACT, name, label, fieldType, required, hidden: false, ...extra };
}

function buildFormBody(includeLeadSource) {
  const visible = [
    textField('firstname', 'First name', 'single_line_text', true),
    textField('lastname', 'Last name', 'single_line_text', true),
    textField('email', 'Email', 'email', true, { validation: { blockedEmailDomains: [], useDefaultBlockList: false } }),
    textField('company', 'Business name', 'single_line_text', true),
    textField('jobtitle', 'Your role', 'single_line_text', false),
    {
      objectTypeId: CONTACT,
      name: 'cos_best_evenings',
      label: 'Best evenings for a one-hour Zoom',
      fieldType: 'multiple_checkboxes',
      required: true,
      hidden: false,
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((d, i) => ({
        label: d,
        value: d,
        displayOrder: i,
      })),
    },
    {
      objectTypeId: CONTACT,
      name: 'cos_email_platform',
      label: 'Your email and calendar platform',
      fieldType: 'dropdown',
      required: true,
      hidden: false,
      placeholder: 'Choose one',
      options: [
        { label: 'Google (Gmail + Google Calendar)', value: 'Google', displayOrder: 0 },
        { label: 'Microsoft 365 (Outlook)', value: 'Microsoft 365', displayOrder: 1 },
        { label: 'Other', value: 'Other', displayOrder: 2 },
      ],
    },
    textField('cos_biggest_bottleneck', 'The one task that eats the most hours in your week', 'multi_line_text', false),
  ];

  const hidden = [
    { objectTypeId: CONTACT, name: 'cos_sprint_interest', label: 'COS Sprint interest', fieldType: 'single_line_text', required: false, hidden: true, defaultValue: 'Fall 2026' },
    { objectTypeId: CONTACT, name: 'cos_sprint_source', label: 'COS Sprint source', fieldType: 'single_line_text', required: false, hidden: true, defaultValue: 'sbap-lab1' },
  ];
  if (includeLeadSource) {
    hidden.push({
      objectTypeId: CONTACT,
      name: 'lead_source',
      label: 'Lead Source',
      fieldType: 'dropdown',
      required: false,
      hidden: true,
      defaultValues: ['Workshop / Webinar'],
      options: [{ label: 'Workshop / Webinar', value: 'Workshop / Webinar', displayOrder: 0 }],
    });
  }

  return {
    formType: 'hubspot',
    name: FORM_NAME,
    archived: false,
    fieldGroups: [...visible, ...hidden].map((f) => ({ groupType: 'default_group', richTextType: 'text', fields: [f] })),
    configuration: {
      language: 'en',
      createNewContactForNewEmail: false,
      editable: true,
      allowLinkToResetKnownValues: true,
      lifecycleStages: [],
      postSubmitAction: { type: 'thank_you', value: THANK_YOU },
      prePopulateKnownValues: true,
      cloneable: true,
      notifyContactOwner: false,
      recaptchaEnabled: false,
      archivable: true,
      notifyRecipients: [NOTIFY_EMAIL],
    },
    displayOptions: {
      renderRawHtml: false,
      theme: 'default_style',
      submitButtonText: 'Save my spot',
      style: {
        fontFamily: 'Open Sans',
        backgroundWidth: '100%',
        labelTextColor: '#1B365D',
        labelTextSize: '14px',
        helpTextColor: '#4a5568',
        helpTextSize: '12px',
        legalConsentTextColor: '#4a5568',
        legalConsentTextSize: '12px',
        submitColor: '#F5A623',
        submitAlignment: 'left',
        submitFontColor: '#1B365D',
        submitSize: '16px',
      },
      cssClass: 'hs-form cos-sprint-form',
    },
    legalConsentOptions: { type: 'none' },
  };
}

async function findFormByName(name) {
  let after;
  do {
    const q = new URLSearchParams({ limit: '100' });
    if (after) q.set('after', after);
    const page = await api('GET', `/marketing/v3/forms/?${q}`);
    const hit = (page.results || []).find((f) => f.name === name && !f.archived);
    if (hit) return hit;
    after = page.paging?.next?.after;
  } while (after);
  return null;
}

async function ensureForm(includeLeadSource) {
  const existing = await findFormByName(FORM_NAME);
  if (existing) {
    summary.form = { id: existing.id, portalId: PORTAL_ID, status: 'exists' };
    log('1b', `Form "${FORM_NAME}" exists: ${existing.id}`);
    return;
  }
  let body = buildFormBody(includeLeadSource);
  try {
    const created = await api('POST', '/marketing/v3/forms/', body);
    summary.form = { id: created.id, portalId: PORTAL_ID, status: 'created' };
    log('1b', `Created form "${FORM_NAME}": ${created.id}`);
  } catch (err) {
    // Some portals reject notifyRecipients as emails or legalConsentOptions.type=none. Retry once, simplified.
    log('1b', `First create attempt failed (${err.status}). Retrying with simplified configuration.`);
    log('1b', `Error detail: ${JSON.stringify(err.data).slice(0, 800)}`);
    delete body.configuration.notifyRecipients;
    body.legalConsentOptions = { type: 'none' };
    const created = await api('POST', '/marketing/v3/forms/', body);
    summary.form = { id: created.id, portalId: PORTAL_ID, status: 'created (without notifyRecipients; set notifications in the HubSpot UI)' };
    summary.warnings.push(`Form notifications to ${NOTIFY_EMAIL} could not be set via API. Set them in the form editor.`);
    log('1b', `Created form "${FORM_NAME}": ${created.id}`);
  }
}

// ── 1c. Lists ────────────────────────────────────────────────────────────────

async function findListByName(name) {
  try {
    const r = await api('GET', `/crm/v3/lists/object-type-id/${CONTACT}/name/${encodeURIComponent(name)}`);
    return r.list || null;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function ensureLists() {
  try {
    let active = await findListByName(ACTIVE_LIST_NAME);
    if (active) {
      log('1c', `Active list exists: ${active.listId}`);
    } else {
      const r = await api('POST', '/crm/v3/lists/', {
        name: ACTIVE_LIST_NAME,
        objectTypeId: CONTACT,
        processingType: 'DYNAMIC',
        filterBranch: {
          filterBranchType: 'OR',
          filterBranches: [
            {
              filterBranchType: 'AND',
              filterBranches: [],
              filters: [
                {
                  filterType: 'PROPERTY',
                  property: 'cos_sprint_interest',
                  operation: { operationType: 'MULTISTRING', operator: 'IS_EQUAL_TO', values: ['Fall 2026'], includeObjectsWithNoValueSet: false },
                },
              ],
            },
          ],
          filters: [],
        },
      });
      active = r.list;
      log('1c', `Created active list: ${active.listId}`);
    }
    summary.lists.active = { name: ACTIVE_LIST_NAME, listId: active.listId };

    let stat = await findListByName(STATIC_LIST_NAME);
    if (stat) {
      log('1c', `Static list exists: ${stat.listId}`);
    } else {
      const r = await api('POST', '/crm/v3/lists/', { name: STATIC_LIST_NAME, objectTypeId: CONTACT, processingType: 'MANUAL' });
      stat = r.list;
      log('1c', `Created static list: ${stat.listId}`);
    }
    const add = await api('PUT', `/crm/v3/lists/${stat.listId}/memberships/add`, STATIC_LIST_CONTACT_IDS);
    const added = add?.recordIdsAdded?.length ?? 0;
    const missing = add?.recordIdsMissing || [];
    summary.lists.static = { name: STATIC_LIST_NAME, listId: stat.listId, added, alreadyMembers: STATIC_LIST_CONTACT_IDS.length - added - missing.length, missingContactIds: missing };
    log('1c', `Static list membership: added ${added}, missing ${missing.length}`);
  } catch (err) {
    const scope = missingScope(err);
    summary.lists.error = scope ? `missing scope: ${scope}` : err.message;
    summary.warnings.push(`Lists: ${summary.lists.error}`);
    log('1c', `Lists failed: ${summary.lists.error}`);
  }
}

// ── 1d. Pipeline ─────────────────────────────────────────────────────────────

async function ensurePipeline() {
  try {
    const all = await api('GET', '/crm/v3/pipelines/deals');
    let pipe = (all.results || []).find((p) => p.label === PIPELINE_LABEL);
    if (pipe) {
      log('1d', `Pipeline "${PIPELINE_LABEL}" exists: ${pipe.id}`);
    } else {
      const displayOrder = (all.results || []).length;
      pipe = await api('POST', '/crm/v3/pipelines/deals', {
        label: PIPELINE_LABEL,
        displayOrder,
        stages: PIPELINE_STAGES.map((label, i) => ({
          label,
          displayOrder: i,
          metadata: { probability: label === 'Closed lost' ? '0.0' : label === 'Completed' || label === 'Enrolled (paid)' ? '1.0' : String((i + 1) * 0.2) },
        })),
      });
      log('1d', `Created pipeline "${PIPELINE_LABEL}": ${pipe.id}`);
    }
    summary.pipeline = {
      id: pipe.id,
      stages: (pipe.stages || []).sort((a, b) => a.displayOrder - b.displayOrder).map((s) => ({ label: s.label, id: s.id })),
    };
  } catch (err) {
    const scope = missingScope(err);
    summary.pipeline = { error: scope ? `missing scope: ${scope}` : err.message };
    summary.warnings.push(`Pipeline: ${summary.pipeline.error}`);
    log('1d', `Pipeline failed: ${summary.pipeline.error}`);
  }
}

// ── Workflows availability ───────────────────────────────────────────────────

async function checkWorkflows() {
  try {
    const r = await api('GET', '/automation/v4/flows?limit=1');
    summary.workflows = { available: true, note: `API reachable (${(r.results || []).length} flow returned in probe)` };
  } catch (err) {
    const scope = missingScope(err);
    if (err.status === 403 && scope) summary.workflows = { available: 'unknown', note: `token lacks scope ${scope}` };
    else if (err.status === 403) summary.workflows = { available: false, note: `403: ${JSON.stringify(err.data).slice(0, 200)}` };
    else summary.workflows = { available: 'unknown', note: err.message.slice(0, 200) };
  }
  log('wf', `Workflows: ${JSON.stringify(summary.workflows)}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  try {
    await ensurePropertyGroup();
    await ensureProperties();
    const leadSourceOk = await checkLeadSource();
    await ensureForm(leadSourceOk);
    await ensureLists();
    await ensurePipeline();
    await checkWorkflows();
  } catch (err) {
    console.error('FATAL:', err.message);
    summary.warnings.push(`FATAL: ${err.message}`);
  }
  console.log('\n=== COS Sprint HubSpot setup summary ===');
  console.log(JSON.stringify(summary, null, 2));
  if (summary.form?.id) {
    console.log(`\nForm embed: portalId=${PORTAL_ID} region=na2 formId=${summary.form.id}`);
    console.log('Paste the formId into COS_FORM_ID in src/components/CosSprint.jsx');
  }
})();
