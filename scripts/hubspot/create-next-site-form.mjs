#!/usr/bin/env node
/**
 * Creates the HubSpot form behind the native form on sherpatech.ai/next.
 *
 * Why a second form: the "Voice AI next step" form (88162ad1) was made in the new
 * form editor. Forms of that type only render inside a HubSpot iframe, and the
 * Submission API refuses them while CAPTCHA is on, which the API cannot change
 * ("not allowlisted to perform an operation to v4 forms"). This script makes a
 * classic form with the same fields and no CAPTCHA so the page can render its
 * own inputs and post to the Forms Submission API.
 *
 * Idempotent: finds the form by name before creating it.
 * Reads the token from HUBSPOT_PRIVATE_APP_TOKEN. Never prints it.
 *
 * Usage:
 *   HUBSPOT_PRIVATE_APP_TOKEN=... node scripts/hubspot/create-next-site-form.mjs
 */

const TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
if (!TOKEN) {
  console.error('HUBSPOT_PRIVATE_APP_TOKEN is not set. Aborting.');
  process.exit(1);
}

const BASE = 'https://api.hubapi.com';
const NOTIFY_EMAIL = 'mark@sherpatech.ai';
const CONTACT = '0-1';
const FORM_NAME = 'Voice AI next step (site)';
const FORMS_PATHS = ['/marketing/v3/forms/', '/marketing/forms/2026-09-beta'];

const THANK_YOU = 'Got it. Mark replies within one business day with the next step for the path you picked.';

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

function field(name, label, fieldType, required, extra = {}) {
  return { objectTypeId: CONTACT, name, label, fieldType, required, hidden: false, dependentFields: [], ...extra };
}

// Same fields, labels, and option values as form 88162ad1.
const PATH_OPTIONS = [
  { label: 'Build it for me', value: 'build_it_for_me' },
  { label: 'Coach me, I build it', value: 'coach_me' },
  { label: 'Build it in a group', value: 'cohort' },
  { label: 'Just the recording and the prompts', value: 'recording_only' },
];

function buildFormBody() {
  const fields = [
    field('firstname', 'First Name', 'single_line_text', false),
    field('lastname', 'Last Name', 'single_line_text', false),
    field('email', 'Email', 'email', true, { validation: { blockedEmailDomains: [], useDefaultBlockList: false } }),
    field('phone', "Phone, if you'd rather talk", 'phone', false, { useCountryCodeSelect: false, validation: { minAllowedDigits: 7, maxAllowedDigits: 20 } }),
    // 88162ad1 stores this on the company object ("name"), which classic forms reject.
    // The contact's own company property keeps the same label and lands on the contact.
    field('company', 'Business or organization', 'single_line_text', false),
    field('voice_ai__what_to_handle', 'What do you want your phone agent to handle?', 'multi_line_text', false),
    field('voice_ai_next_step', 'Which path fits you?', 'dropdown', true, {
      options: PATH_OPTIONS.map((o, i) => ({ ...o, displayOrder: i, description: '' })),
      defaultValues: [],
      placeholder: 'Pick one',
    }),
  ];
  const now = new Date().toISOString();
  return {
    formType: 'hubspot',
    name: FORM_NAME,
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
      submitButtonText: 'Send',
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
      cssClass: 'hs-form next-site-form',
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

(async () => {
  const existing = await findFormByName(FORM_NAME);
  if (existing) {
    console.log(JSON.stringify({ status: 'exists', id: existing.id, name: FORM_NAME }, null, 2));
    return;
  }
  const body = buildFormBody();
  let lastErr;
  for (const withNotify of [true, false]) {
    if (!withNotify) body.configuration.notifyRecipients = [];
    for (const path of FORMS_PATHS) {
      try {
        const created = await api('POST', path, body);
        console.log(JSON.stringify({ status: 'created', id: created.id, name: FORM_NAME, path, notify: withNotify }, null, 2));
        if (!withNotify) console.log(`WARNING: notifications to ${NOTIFY_EMAIL} could not be set via API. Set them in the form editor.`);
        return;
      } catch (err) {
        lastErr = err;
        console.error(`POST ${path} (notify=${withNotify}) failed: ${err.message.slice(0, 400)}`);
      }
    }
  }
  console.error('FATAL:', lastErr.message);
  process.exit(1);
})();
