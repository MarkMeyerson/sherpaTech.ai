#!/usr/bin/env node
/**
 * Patch for the Voice AI Workshop Oct 7 registration form (sherpatech.ai/october-7).
 *
 * Adds two contact properties and two optional fields to the EXISTING form:
 *   - voice_ai_workshop_recording_only (checkbox): can't attend, wants recording and prompts
 *   - voice_ai_workshop_next_step (dropdown): build_it_for_me | teach_me | just_watching
 *
 * Idempotent: skips properties and fields that already exist.
 * Reads the token from HUBSPOT_PRIVATE_APP_TOKEN. Never prints it.
 *
 * Usage:
 *   HUBSPOT_PRIVATE_APP_TOKEN=... node scripts/hubspot/patch-oct7-workshop-form.mjs
 */

const TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
if (!TOKEN) {
  console.error('HUBSPOT_PRIVATE_APP_TOKEN is not set. Aborting.');
  process.exit(1);
}

const BASE = 'https://api.hubapi.com';
const CONTACT = '0-1';
const FORM_ID = 'c3e1d92f-f311-41dd-a266-bf3d1812fa43';
const QUESTION_PROP = 'voice_ai_workshop_question';
const RECORDING_PROP = 'voice_ai_workshop_recording_only';
const NEXT_STEP_PROP = 'voice_ai_workshop_next_step';

const NEXT_STEP_OPTIONS = [
  { label: 'Build one for my business', value: 'build_it_for_me' },
  { label: 'Teach me to build my own', value: 'teach_me' },
  { label: 'Just watching for now', value: 'just_watching' },
];

const summary = { properties: {}, form: null, warnings: [] };

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
    const err = new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 800)}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

const log = (step, msg) => console.log(`[${step}] ${msg}`);

// ── 1. Properties ────────────────────────────────────────────────────────────

const PROPERTIES = [
  {
    name: RECORDING_PROP,
    label: 'Voice AI Workshop Oct 7: wants recording only',
    type: 'bool',
    fieldType: 'booleancheckbox',
    groupName: 'contactinformation',
    description:
      'Checked when the contact registered on sherpatech.ai/october-7 but said they cannot attend and want the recording and prompts.',
    options: [
      { label: 'Yes', value: 'true', displayOrder: 0, hidden: false },
      { label: 'No', value: 'false', displayOrder: 1, hidden: false },
    ],
  },
  {
    name: NEXT_STEP_PROP,
    label: 'Voice AI Workshop Oct 7: what next',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    description:
      'Interest captured on the Oct 7 registration form. Mirrors the two boxes on the paper interest card used in the room.',
    options: NEXT_STEP_OPTIONS.map((o, i) => ({ ...o, displayOrder: i, hidden: false })),
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

// ── 2. Form fields ───────────────────────────────────────────────────────────

function group(field) {
  return { groupType: 'default_group', richTextType: 'text', fields: [field] };
}

const RECORDING_FIELD = {
  objectTypeId: CONTACT,
  name: RECORDING_PROP,
  label: "I can't make it on Oct 7. Send me the recording and the prompts.",
  fieldType: 'single_checkbox',
  required: false,
  hidden: false,
  dependentFields: [],
  defaultValue: false,
};

const NEXT_STEP_FIELD = {
  objectTypeId: CONTACT,
  name: NEXT_STEP_PROP,
  label: 'If you like what you see, what would you want next?',
  fieldType: 'dropdown',
  required: false,
  hidden: false,
  dependentFields: [],
  placeholder: 'Choose one',
  options: NEXT_STEP_OPTIONS.map((o, i) => ({ ...o, description: '', displayOrder: i })),
  defaultValues: [],
};

async function patchForm() {
  const form = await api('GET', `/marketing/v3/forms/${FORM_ID}`);
  const names = form.fieldGroups.flatMap((g) => g.fields.map((f) => f.name));
  log('2', `Form "${form.name}" has fields: ${names.join(', ')}`);

  const missing = [RECORDING_FIELD, NEXT_STEP_FIELD].filter((f) => !names.includes(f.name));
  if (missing.length === 0) {
    summary.form = { id: FORM_ID, status: 'both fields already present', fields: names };
    log('2', 'Nothing to add');
    return;
  }

  // Insert the new groups right after the survey question, before the hidden flag field.
  const groups = [...form.fieldGroups];
  let idx = groups.findIndex((g) => g.fields.some((f) => f.name === QUESTION_PROP));
  if (idx === -1) {
    // Fall back to: before the first hidden field.
    idx = groups.findIndex((g) => g.fields.every((f) => f.hidden));
    idx = idx === -1 ? groups.length - 1 : idx - 1;
  }
  groups.splice(idx + 1, 0, ...missing.map(group));

  const body = {
    ...form,
    fieldGroups: groups,
    updatedAt: new Date().toISOString(),
  };
  // Server-managed fields that the validator rejects on write.
  delete body.id;

  let updated;
  try {
    updated = await api('PUT', `/marketing/v3/forms/${FORM_ID}`, body);
  } catch (err) {
    log('2', `PUT failed (${err.status}), trying PATCH with fieldGroups only`);
    updated = await api('PATCH', `/marketing/v3/forms/${FORM_ID}`, { fieldGroups: groups });
  }
  const after = updated.fieldGroups.flatMap((g) => g.fields.map((f) => `${f.name}${f.hidden ? '(hidden)' : ''}`));
  summary.form = { id: FORM_ID, status: `added ${missing.map((f) => f.name).join(', ')}`, fields: after };
  log('2', `Form now has: ${after.join(', ')}`);
}

(async () => {
  try {
    await ensureProperties();
    await patchForm();
  } catch (err) {
    console.error('FATAL:', err.message);
    summary.warnings.push(`FATAL: ${err.message}`);
  }
  console.log('\n=== Oct 7 form patch summary ===');
  console.log(JSON.stringify(summary, null, 2));
})();
