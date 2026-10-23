#!/usr/bin/env node
/**
 * HubSpot setup for the Voice AI Sales Rep Program (sherpatech.ai/omer and future reps).
 *
 * Idempotent: every step checks for the item before creating it, so it is safe to rerun.
 * Reads the token from HUBSPOT_PRIVATE_APP_TOKEN. Never prints it.
 *
 * Usage:
 *   HUBSPOT_PRIVATE_APP_TOKEN=... node scripts/hubspot/setup-rep-program.mjs
 *   node scripts/hubspot/setup-rep-program.mjs --dry-run   (no token needed, prints the plan)
 *
 * Creates:
 *   1. Property group "Sales Rep Program" on contacts and deals
 *   2. Contact properties sales_rep (dropdown) and rep_intro_date (date)
 *   3. Deal properties sales_rep, commission_amount, commission_status, commission_paid_date
 *   4. Form "Rep Lead: Omer" (sales_rep hidden, preset to Omer Polanco) for sherpatech.ai/omer
 *   5. Form "Rep Lead Registration" (sales_rep visible) for reps to register leads they meet
 *   6. Marks Omer's own contact as non-marketing so he never gets prospect emails
 *
 * Adding a rep later: add the name to REP_OPTIONS and an entry to REP_FORMS, rerun.
 */

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
if (!TOKEN && !DRY_RUN) {
  console.error('HUBSPOT_PRIVATE_APP_TOKEN is not set. Aborting. (Use --dry-run to preview without it.)');
  process.exit(1);
}

const BASE = 'https://api.hubapi.com';
const PORTAL_ID = '243001979';
const NOTIFY_EMAIL = 'mark@sherpatech.ai';
const CONTACT = '0-1';

const GROUP_NAME = 'sales_rep_program';
const GROUP_LABEL = 'Sales Rep Program';

// Internal value and label are the same so the page can send the display name as the value.
const REP_OPTIONS = ['Direct', 'Omer Polanco', 'Dr. Tom Campbell'];
const COMMISSION_STATUS_OPTIONS = ['Not owed', 'Owed', 'Paid'];

// Reused from the /next form so the answer lands on the same contact property.
const WANT_PROP = 'voice_ai__what_to_handle';

// Omer's existing contact. Never duplicated, never given a sales_rep value.
const OMER_CONTACT_ID = '565662794469';
const OMER_EMAIL = 'djomerdmv@gmail.com';

// One entry per rep page. The page posts to this form with sales_rep preset.
const REP_FORMS = [
  { formName: 'Rep Lead: Omer', rep: 'Omer Polanco', thankYou: 'Got it. Mark will reach out within one business day. Omer will check in too.' },
];
const REGISTRATION_FORM_NAME = 'Rep Lead Registration';
const REGISTRATION_THANK_YOU = 'Lead registered. Mark gets an email and follows up within one business day.';

const summary = { groups: {}, properties: { contacts: {}, deals: {} }, forms: [], omer: {}, warnings: [] };

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

const log = (step, msg) => console.log(`[${step}] ${msg}`);

async function getOr404(path) {
  try {
    return await api('GET', path);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

// ── 1. Property groups ───────────────────────────────────────────────────────

async function ensureGroup(objectType) {
  if (DRY_RUN) {
    summary.groups[objectType] = `would create group ${GROUP_NAME} ("${GROUP_LABEL}") if missing`;
    return;
  }
  const existing = await getOr404(`/crm/v3/properties/${objectType}/groups/${GROUP_NAME}`);
  if (existing) {
    summary.groups[objectType] = 'exists';
    log('1', `Group ${GROUP_NAME} exists on ${objectType}`);
    return;
  }
  await api('POST', `/crm/v3/properties/${objectType}/groups`, { name: GROUP_NAME, label: GROUP_LABEL, displayOrder: -1 });
  summary.groups[objectType] = 'created';
  log('1', `Created group ${GROUP_NAME} on ${objectType}`);
}

// ── 2 and 3. Properties ──────────────────────────────────────────────────────

const enumOptions = (labels) => labels.map((label, i) => ({ label, value: label, displayOrder: i, hidden: false }));

const SALES_REP_PROP = {
  name: 'sales_rep',
  label: 'Sales Rep',
  type: 'enumeration',
  fieldType: 'select',
  groupName: GROUP_NAME,
  description: 'Which sales rep introduced this record. Direct means no rep. Drives commission tracking.',
  options: enumOptions(REP_OPTIONS),
};

const PROPERTIES = {
  contacts: [
    SALES_REP_PROP,
    {
      name: 'rep_intro_date',
      label: 'Rep Intro Date',
      type: 'date',
      fieldType: 'date',
      groupName: GROUP_NAME,
      description: 'Date the sales rep first introduced this contact. First intro wins.',
    },
  ],
  deals: [
    SALES_REP_PROP,
    {
      name: 'commission_amount',
      label: 'Commission Amount',
      type: 'number',
      fieldType: 'number',
      groupName: GROUP_NAME,
      description: 'Rep commission in dollars. 250 for a paid AI Receptionist setup, 100 for a paid Personal Assistant setup.',
    },
    {
      name: 'commission_status',
      label: 'Commission Status',
      type: 'enumeration',
      fieldType: 'select',
      groupName: GROUP_NAME,
      description: 'Not owed until the setup invoice is paid (Closed Won). Owed after that. Paid when the money goes out.',
      options: enumOptions(COMMISSION_STATUS_OPTIONS),
    },
    {
      name: 'commission_paid_date',
      label: 'Commission Paid Date',
      type: 'date',
      fieldType: 'date',
      groupName: GROUP_NAME,
      description: 'Date the commission was paid to the rep.',
    },
  ],
};

async function ensureProperties(objectType) {
  for (const p of PROPERTIES[objectType]) {
    if (DRY_RUN) {
      const opts = p.options ? ` options: ${p.options.map((o) => o.value).join(' | ')}` : '';
      summary.properties[objectType][p.name] = `would create (${p.type}/${p.fieldType})${opts}`;
      continue;
    }
    const existing = await getOr404(`/crm/v3/properties/${objectType}/${p.name}`);
    if (!existing) {
      await api('POST', `/crm/v3/properties/${objectType}`, p);
      summary.properties[objectType][p.name] = `created (${p.type}/${p.fieldType})`;
      log('2', `Created ${objectType}.${p.name}`);
      continue;
    }
    // Exists. For dropdowns, add any option that is missing (new reps) without touching the rest.
    if (p.options) {
      const have = new Set((existing.options || []).map((o) => o.value));
      const missing = p.options.filter((o) => !have.has(o.value));
      if (missing.length) {
        const merged = [...(existing.options || []), ...missing.map((o, i) => ({ ...o, displayOrder: have.size + i }))];
        await api('PATCH', `/crm/v3/properties/${objectType}/${p.name}`, { options: merged });
        summary.properties[objectType][p.name] = `exists; added options ${missing.map((o) => o.value).join(', ')}`;
        log('2', `${objectType}.${p.name} exists; added ${missing.length} option(s)`);
        continue;
      }
    }
    summary.properties[objectType][p.name] = `exists (${existing.type}/${existing.fieldType})`;
    log('2', `${objectType}.${p.name} exists`);
  }
}

// ── 4 and 5. Forms ───────────────────────────────────────────────────────────

// Same shape as scripts/hubspot/create-next-site-form.mjs: classic form, no CAPTCHA,
// so the page can render its own inputs and post to the Forms Submission API.
const FORMS_PATHS = ['/marketing/v3/forms/', '/marketing/forms/2026-09-beta'];

function field(name, label, fieldType, required, extra = {}) {
  return { objectTypeId: CONTACT, name, label, fieldType, required, hidden: false, dependentFields: [], ...extra };
}

function repDropdown(extra = {}) {
  return field('sales_rep', 'Sales rep', 'dropdown', true, {
    options: REP_OPTIONS.map((label, i) => ({ label, value: label, displayOrder: i, description: '' })),
    defaultValues: [],
    placeholder: 'Pick one',
    ...extra,
  });
}

function leadFields() {
  return [
    field('firstname', 'First name', 'single_line_text', false),
    field('lastname', 'Last name', 'single_line_text', false),
    field('email', 'Email', 'email', true, { validation: { blockedEmailDomains: [], useDefaultBlockList: false } }),
    field('phone', 'Phone', 'phone', false, { useCountryCodeSelect: false, validation: { minAllowedDigits: 7, maxAllowedDigits: 20 } }),
    field('company', 'Business', 'single_line_text', false),
    field(WANT_PROP, 'What would you want handled?', 'multi_line_text', false),
  ];
}

// The page sets this from the browser on submit. HubSpot forms cannot default a date
// field to "today", so it is hidden on the rep page form and visible on the registration form.
const introDate = (hidden) => field('rep_intro_date', 'Rep intro date', 'datepicker', false, { hidden });

function buildFormBody({ name, thankYou, fields, submitText, cssClass }) {
  const now = new Date().toISOString();
  return {
    formType: 'hubspot',
    name,
    archived: false,
    createdAt: now,
    updatedAt: now,
    fieldGroups: fields.map((f) => ({ groupType: 'default_group', richTextType: 'text', fields: [f] })),
    configuration: {
      language: 'en',
      createNewContactForNewEmail: true,
      editable: true,
      allowLinkToResetKnownValues: false,
      lifecycleStages: [],
      postSubmitAction: { type: 'thank_you', value: thankYou },
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
      submitButtonText: submitText,
      style: {
        fontFamily: 'Open Sans',
        backgroundWidth: '100%',
        labelTextColor: '#1B365D',
        labelTextSize: '14px',
        helpTextColor: '#4a5568',
        helpTextSize: '12px',
        legalConsentTextColor: '#4a5568',
        legalConsentTextSize: '12px',
        submitColor: '#1B365D',
        submitAlignment: 'left',
        submitFontColor: '#FFFFFF',
        submitSize: '16px',
      },
      cssClass,
    },
    legalConsentOptions: { type: 'none' },
  };
}

// Rep page form: sales_rep hidden and preset. Two field styles are tried because the
// forms validator has rejected hidden dropdowns before; a hidden text field with the
// same value writes the same property.
function repLeadVariants(rf) {
  const base = { name: rf.formName, thankYou: rf.thankYou, submitText: 'Send', cssClass: 'hs-form rep-lead-form' };
  return [
    { style: 'hidden dropdown', body: buildFormBody({ ...base, fields: [...leadFields(), repDropdown({ hidden: true, required: false, defaultValues: [rf.rep] }), introDate(true)] }) },
    { style: 'hidden text', body: buildFormBody({ ...base, fields: [...leadFields(), field('sales_rep', 'Sales rep', 'single_line_text', false, { hidden: true, defaultValue: rf.rep }), introDate(true)] }) },
  ];
}

function registrationVariants() {
  const base = { name: REGISTRATION_FORM_NAME, thankYou: REGISTRATION_THANK_YOU, submitText: 'Register lead', cssClass: 'hs-form rep-registration-form' };
  return [{ style: 'visible dropdown', body: buildFormBody({ ...base, fields: [...leadFields(), repDropdown(), introDate(false)] }) }];
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

const editorUrl = (id) => `https://app.hubspot.com/forms/${PORTAL_ID}/editor/${id}/edit/form`;

async function ensureForm(name, variants, purpose) {
  if (DRY_RUN) {
    const v = variants[0];
    const fields = v.body.fieldGroups.map((g) => g.fields[0]).map((f) => `${f.name}${f.hidden ? ' (hidden)' : ''}${f.required ? ' *' : ''}`);
    summary.forms.push({ name, purpose, status: 'would create', fields: fields.join(', '), notify: NOTIFY_EMAIL });
    return;
  }
  const existing = await findFormByName(name);
  if (existing) {
    summary.forms.push({ name, purpose, id: existing.id, status: 'exists', editor: editorUrl(existing.id) });
    log('4', `Form "${name}" exists: ${existing.id}`);
    return;
  }
  let lastErr;
  for (const withNotify of [true, false]) {
    for (const v of variants) {
      const body = structuredClone(v.body);
      if (!withNotify) body.configuration.notifyRecipients = [];
      for (const path of FORMS_PATHS) {
        try {
          const created = await api('POST', path, body);
          const note = withNotify ? '' : ' (without notifyRecipients; set notifications in the form editor)';
          summary.forms.push({ name, purpose, id: created.id, status: `created via ${path}, ${v.style}${note}`, editor: editorUrl(created.id) });
          if (!withNotify) summary.warnings.push(`Form "${name}": notifications to ${NOTIFY_EMAIL} could not be set via API. Set them in the form editor.`);
          log('4', `Created form "${name}": ${created.id}`);
          return;
        } catch (err) {
          lastErr = err;
          log('4', `POST ${path} (${v.style}, notify=${withNotify}) failed (${err.status}): ${JSON.stringify(err.data).slice(0, 300)}`);
        }
      }
    }
  }
  throw lastErr;
}

// ── 6. Omer's contact ────────────────────────────────────────────────────────

async function markOmerNonMarketing() {
  if (DRY_RUN) {
    summary.omer = { id: OMER_CONTACT_ID, plan: 'verify email matches, leave sales_rep empty, set hs_marketable_status=false' };
    return;
  }
  const c = await api('GET', `/crm/v3/objects/contacts/${OMER_CONTACT_ID}?properties=email,hs_marketable_status,sales_rep`);
  summary.omer.id = OMER_CONTACT_ID;
  if ((c.properties.email || '').toLowerCase() !== OMER_EMAIL) {
    summary.warnings.push(`Contact ${OMER_CONTACT_ID} email is ${c.properties.email}, expected ${OMER_EMAIL}. Left untouched.`);
    return;
  }
  summary.omer.sales_rep = c.properties.sales_rep ? `already set to ${c.properties.sales_rep} (left as is)` : 'empty, as intended';
  if (c.properties.hs_marketable_status === 'false') {
    summary.omer.marketing = 'already non-marketing';
    return;
  }
  try {
    await api('PATCH', `/crm/v3/objects/contacts/${OMER_CONTACT_ID}`, { properties: { hs_marketable_status: 'false' } });
    summary.omer.marketing = 'set to non-marketing';
    log('6', 'Omer marked non-marketing');
  } catch (err) {
    summary.omer.marketing = `could not change via API (${err.status})`;
    summary.warnings.push('Omer could not be set to non-marketing via API. In HubSpot: open his record, Actions, Set as non-marketing.');
  }
}

// ── Report ───────────────────────────────────────────────────────────────────

function printTable(rows, cols) {
  const widths = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c] ?? '').length)));
  const line = (r) => '| ' + cols.map((c, i) => String(r[c] ?? '').padEnd(widths[i])).join(' | ') + ' |';
  console.log(line(Object.fromEntries(cols.map((c) => [c, c]))));
  console.log('| ' + widths.map((w) => '-'.repeat(w)).join(' | ') + ' |');
  rows.forEach((r) => console.log(line(r)));
}

function report() {
  console.log(`\n=== Sales Rep Program HubSpot setup summary${DRY_RUN ? ' (DRY RUN, nothing created)' : ''} ===\n`);
  const propRows = [];
  for (const [obj, props] of Object.entries(summary.properties)) {
    for (const [name, status] of Object.entries(props)) propRows.push({ object: obj, 'internal name': name, status });
  }
  console.log('Property groups:', JSON.stringify(summary.groups));
  console.log('');
  printTable(propRows, ['object', 'internal name', 'status']);
  console.log('');
  printTable(summary.forms, DRY_RUN ? ['name', 'purpose', 'status', 'fields'] : ['name', 'purpose', 'id', 'status', 'editor']);
  console.log('\nOmer contact:', JSON.stringify(summary.omer));
  if (summary.warnings.length) {
    console.log('\nWarnings:');
    summary.warnings.forEach((w) => console.log(' - ' + w));
  }
  if (!DRY_RUN) {
    console.log('\nHosted form links: open each editor link above, Share, copy the link. The API does not return them.');
    console.log('Paste the "Rep Lead: Omer" form id into src/data/reps.js (formId) and the hosted link into hostedFormUrl.');
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  try {
    for (const obj of ['contacts', 'deals']) {
      await ensureGroup(obj);
      await ensureProperties(obj);
    }
    for (const rf of REP_FORMS) await ensureForm(rf.formName, repLeadVariants(rf), `sherpatech.ai page for ${rf.rep}`);
    await ensureForm(REGISTRATION_FORM_NAME, registrationVariants(), 'reps register leads they meet in person');
    await markOmerNonMarketing();
  } catch (err) {
    console.error('FATAL:', err.message);
    summary.warnings.push(`FATAL: ${err.message}`);
  }
  report();
})();
