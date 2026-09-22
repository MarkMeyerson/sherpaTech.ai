#!/usr/bin/env node
/**
 * HubSpot setup for the Voice AI Workshop, October 7, 2026 (sherpatech.ai/october-7).
 *
 * Idempotent: every step checks for the item before creating it.
 * Reads the token from HUBSPOT_PRIVATE_APP_TOKEN. Never prints it.
 *
 * Usage:
 *   HUBSPOT_PRIVATE_APP_TOKEN=... node scripts/hubspot/setup-oct7-workshop.mjs
 *
 * Creates:
 *   1. Contact properties voice_ai_workshop_oct7 (checkbox) and voice_ai_workshop_question (text)
 *   2. List "Voice AI Workshop Oct 7 Registrants"
 *      The portal is on Starter (no workflows), so the list is an active list filtered on
 *      voice_ai_workshop_oct7 = true. The form sets that property through a hidden field,
 *      which is what puts every registrant on the list.
 *   3. Form "Voice AI Workshop Oct 7 Registration"
 */

const TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
if (!TOKEN) {
  console.error('HUBSPOT_PRIVATE_APP_TOKEN is not set. Aborting.');
  process.exit(1);
}

const BASE = 'https://api.hubapi.com';
const PORTAL_ID = '243001979';
const NOTIFY_EMAIL = 'mark@sherpatech.ai';
const CONTACT = '0-1';

const FORM_NAME = 'Voice AI Workshop Oct 7 Registration';
const LIST_NAME = 'Voice AI Workshop Oct 7 Registrants';
const FLAG_PROP = 'voice_ai_workshop_oct7';
const QUESTION_PROP = 'voice_ai_workshop_question';
const SOURCE_PROP = 'lead_source_detail';
const SOURCE_VALUE = 'Voice AI Workshop Oct 7 landing page';

const THANK_YOU =
  "You're registered. Watch your inbox for a confirmation and the address details. " +
  'See you October 7 at the AWS Skills Center.';

const summary = { properties: {}, list: null, form: null, warnings: [] };

// ── HTTP helper ──────────────────────────────────────────────────────────────

async function api(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
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

function log(step, msg) {
  console.log(`[${step}] ${msg}`);
}

// ── 1. Properties ────────────────────────────────────────────────────────────

const PROPERTIES = [
  {
    name: FLAG_PROP,
    label: 'Voice AI Workshop Oct 7 (registered)',
    type: 'bool',
    fieldType: 'booleancheckbox',
    groupName: 'contactinformation',
    description: 'True when the contact registered for the Voice AI Workshop on October 7, 2026 via sherpatech.ai/october-7.',
    options: [
      { label: 'Yes', value: 'true', displayOrder: 0, hidden: false },
      { label: 'No', value: 'false', displayOrder: 1, hidden: false },
    ],
  },
  {
    name: QUESTION_PROP,
    label: 'Voice AI Workshop: what would you want a voice agent to handle?',
    type: 'string',
    fieldType: 'text',
    groupName: 'contactinformation',
    description: 'Pre-event survey answer from the Voice AI Workshop Oct 7 registration form.',
  },
];

async function ensureProperties() {
  for (const p of PROPERTIES) {
    try {
      const existing = await api('GET', `/crm/v3/properties/contacts/${p.name}`);
      summary.properties[p.name] = `exists (${existing.type}/${existing.fieldType})`;
      log('1', `Property ${p.name} exists`);
    } catch (err) {
      if (err.status !== 404) throw err;
      await api('POST', '/crm/v3/properties/contacts', p);
      summary.properties[p.name] = `created (${p.type}/${p.fieldType})`;
      log('1', `Created property ${p.name}`);
    }
  }
}

async function checkSourceProperty() {
  try {
    const p = await api('GET', `/crm/v3/properties/contacts/${SOURCE_PROP}`);
    const ok = p.type === 'string';
    summary.properties[SOURCE_PROP] = ok ? `exists (${p.type}/${p.fieldType})` : `exists but not a string (${p.type}); skipped`;
    return ok;
  } catch (err) {
    if (err.status === 404) {
      summary.properties[SOURCE_PROP] = 'missing; hidden field skipped (list membership is enough)';
      return false;
    }
    throw err;
  }
}

// ── 2. List ──────────────────────────────────────────────────────────────────

async function findListByName(name) {
  try {
    const r = await api('GET', `/crm/v3/lists/object-type-id/${CONTACT}/name/${encodeURIComponent(name)}`);
    return r.list || null;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function ensureList() {
  let list = await findListByName(LIST_NAME);
  if (list) {
    log('2', `List "${LIST_NAME}" exists: ${list.listId} (${list.processingType})`);
  } else {
    const r = await api('POST', '/crm/v3/lists/', {
      name: LIST_NAME,
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
                property: FLAG_PROP,
                operation: { operationType: 'BOOL', operator: 'IS_EQUAL_TO', value: true, includeObjectsWithNoValueSet: false },
              },
            ],
          },
        ],
        filters: [],
      },
    });
    list = r.list;
    log('2', `Created active list "${LIST_NAME}": ${list.listId}`);
  }
  summary.list = { name: LIST_NAME, listId: list.listId, processingType: list.processingType };
}

// ── 3. Form ──────────────────────────────────────────────────────────────────

// The portal is enrolled in the Forms "2026-09-beta" rollout. Its validator requires
// dependentFields on every field, defaultValues on enumerated fields, and
// createdAt/updatedAt on create. The v3 path is tried first, then the beta path.
const FORMS_PATHS = ['/marketing/v3/forms/', '/marketing/forms/2026-09-beta'];

function textField(name, label, fieldType, required, extra = {}) {
  return { objectTypeId: CONTACT, name, label, fieldType, required, hidden: false, dependentFields: [], ...extra };
}

function buildFormBody(includeSource, flagStyle) {
  const visible = [
    textField('firstname', 'First name', 'single_line_text', true),
    textField('lastname', 'Last name', 'single_line_text', true),
    textField('email', 'Email', 'email', true, { validation: { blockedEmailDomains: [], useDefaultBlockList: false } }),
    textField('company', 'Company / Organization', 'single_line_text', true),
    textField('jobtitle', 'Role / Title', 'single_line_text', true),
    textField(QUESTION_PROP, 'What would you want a voice agent to handle for you?', 'single_line_text', false),
  ];

  const flagField =
    flagStyle === 'checkbox'
      ? {
          objectTypeId: CONTACT,
          name: FLAG_PROP,
          label: 'Voice AI Workshop Oct 7 (registered)',
          fieldType: 'single_checkbox',
          required: false,
          hidden: true,
          dependentFields: [],
          defaultValue: true,
        }
      : textField(FLAG_PROP, 'Voice AI Workshop Oct 7 (registered)', 'single_line_text', false, { hidden: true, defaultValue: 'true' });

  const hidden = [flagField];
  if (includeSource) {
    hidden.push(textField(SOURCE_PROP, 'Lead source detail', 'single_line_text', false, { hidden: true, defaultValue: SOURCE_VALUE }));
  }

  const now = new Date().toISOString();
  return {
    formType: 'hubspot',
    name: FORM_NAME,
    archived: false,
    createdAt: now,
    updatedAt: now,
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
      submitButtonText: 'Save my seat',
      style: {
        fontFamily: 'Open Sans',
        backgroundWidth: '100%',
        labelTextColor: '#1B365D',
        labelTextSize: '14px',
        helpTextColor: '#4a5568',
        helpTextSize: '12px',
        legalConsentTextColor: '#4a5568',
        legalConsentTextSize: '12px',
        submitColor: '#FF6A3D',
        submitAlignment: 'left',
        submitFontColor: '#FFFFFF',
        submitSize: '16px',
      },
      cssClass: 'hs-form oct7-workshop-form',
    },
    legalConsentOptions: { type: 'none' },
  };
}

async function findFormByName(name) {
  let after;
  do {
    const q = new URLSearchParams({ limit: '100' });
    if (after) q.set('after', after);
    const page = await api('GET', `${FORMS_PATHS[0]}?${q}`);
    const hit = (page.results || []).find((f) => f.name === name && !f.archived);
    if (hit) return hit;
    after = page.paging?.next?.after;
  } while (after);
  return null;
}

async function tryCreateForm(body) {
  let lastErr;
  for (const path of FORMS_PATHS) {
    try {
      const created = await api('POST', path, body);
      return { created, path };
    } catch (err) {
      lastErr = err;
      log('3', `POST ${path} failed (${err.status}): ${JSON.stringify(err.data).slice(0, 400)}`);
    }
  }
  throw lastErr;
}

async function ensureForm(includeSource) {
  const existing = await findFormByName(FORM_NAME);
  if (existing) {
    summary.form = { id: existing.id, portalId: PORTAL_ID, status: 'exists' };
    log('3', `Form "${FORM_NAME}" exists: ${existing.id}`);
    return;
  }
  const attempts = [
    ['checkbox', true],
    ['text', true],
    ['checkbox', false],
    ['text', false],
  ];
  let lastErr;
  for (const [flagStyle, withNotify] of attempts) {
    const body = buildFormBody(includeSource, flagStyle);
    if (!withNotify) body.configuration.notifyRecipients = [];
    try {
      const { created, path } = await tryCreateForm(body);
      const note = withNotify ? '' : ' (without notifyRecipients; set notifications in the form editor)';
      summary.form = { id: created.id, portalId: PORTAL_ID, status: `created via ${path}, flag field as ${flagStyle}${note}` };
      if (!withNotify) summary.warnings.push(`Form notifications to ${NOTIFY_EMAIL} could not be set via API. Set them in the form editor.`);
      log('3', `Created form "${FORM_NAME}": ${created.id}`);
      return;
    } catch (err) {
      lastErr = err;
      log('3', `Attempt (flag=${flagStyle}, notify=${withNotify}) failed; trying next.`);
    }
  }
  throw lastErr;
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  try {
    await ensureProperties();
    const sourceOk = await checkSourceProperty();
    await ensureList();
    await ensureForm(sourceOk);
  } catch (err) {
    console.error('FATAL:', err.message);
    summary.warnings.push(`FATAL: ${err.message}`);
  }
  console.log('\n=== Voice AI Workshop Oct 7 HubSpot setup summary ===');
  console.log(JSON.stringify(summary, null, 2));
  if (summary.form?.id) {
    console.log(`\nForm embed: portalId=${PORTAL_ID} region=na2 formId=${summary.form.id}`);
    console.log('Paste the formId into OCT7_FORM_ID in src/components/October7.jsx');
  }
})();
