# Voice AI Sales Rep Program: HubSpot reference

Status report and reference, started 2026-10-23. Covers everything created in HubSpot for the sales rep program (first rep: Omer Polanco, page sherpatech.ai/omer).

## Summary

Reps never get a HubSpot login. Credit is stamped on the contact by a hidden form field on the rep's page, or by the rep registering the lead on a hosted form. Commission lives on the deal.

| Rep | Page | Form | Commission |
|---|---|---|---|
| Omer Polanco | https://sherpatech.ai/omer | Rep Lead: Omer | $250 per paid AI Receptionist setup, $100 per paid Personal Assistant setup |

## How to rerun or add a rep

```
node scripts/hubspot/setup-rep-program.mjs --dry-run      # preview, no token needed
HUBSPOT_PRIVATE_APP_TOKEN=... node scripts/hubspot/setup-rep-program.mjs
```

The script is idempotent. To add a rep: add the name to `REP_OPTIONS` and an entry to `REP_FORMS` in the script, rerun, then add the rep to `src/data/reps.js`. No component changes.

## HubSpot reference (portal 243001979)

Status: **blocked, 2026-10-23**. The script has been written and dry-run twice. The live run was attempted with `HUBSPOT_PRIVATE_APP_TOKEN` set, but every call to api.hubapi.com came back 401 "Authentication credentials not found", the error HubSpot returns when no Authorization header arrives. The same header reaches other hosts from the build environment, and a fake token gets the same message instead of "invalid or expired", so the header is being dropped or rewritten on the way to HubSpot, not rejected by HubSpot. Rerun the script from a machine where the token reaches HubSpot (for example locally, as the Oct 7 scripts were run), then fill in the ids below.

### Property group

| Object | Internal name | Label | Status |
|---|---|---|---|
| contacts | sales_rep_program | Sales Rep Program | pending |
| deals | sales_rep_program | Sales Rep Program | pending |

### Contact properties

| Internal name | Label | Type | Options / notes | Status |
|---|---|---|---|---|
| sales_rep | Sales Rep | Dropdown | Direct, Omer Polanco, Dr. Tom Campbell | pending |
| rep_intro_date | Rep Intro Date | Date | Set by the rep page on submit, or by the rep on the registration form | pending |

### Deal properties

| Internal name | Label | Type | Options / notes | Status |
|---|---|---|---|---|
| sales_rep | Sales Rep | Dropdown | Same options as contact | pending |
| commission_amount | Commission Amount | Number | 250 or 100 | pending |
| commission_status | Commission Status | Dropdown | Not owed, Owed, Paid | pending |
| commission_paid_date | Commission Paid Date | Date | | pending |

### Forms

Both are classic forms with no CAPTCHA and notifications to mark@sherpatech.ai, same pattern as "Voice AI next step (site)" (fdb57885-ec27-4f9e-a6c1-68ed0d3fecb4).

| Form | Fields | Form id | Hosted link | Status |
|---|---|---|---|---|
| Rep Lead: Omer | first name, last name, email (required), phone, business, what you would want handled, sales_rep (hidden, Omer Polanco), rep_intro_date (hidden, set by the page) | pending | pending | pending |
| Rep Lead Registration | same fields, sales_rep as a visible required dropdown, rep_intro_date visible | pending | pending | pending |

The forms API does not return hosted links. Open the form in the editor, Share, copy the link, and paste it here and into `src/data/reps.js` (`hostedFormUrl`).

### Omer's own contact

| Item | Value |
|---|---|
| Contact | https://app.hubspot.com/contacts/243001979/record/0-1/565662794469 (djomerdmv@gmail.com) |
| sales_rep | left empty on purpose |
| Marketing status | pending: script sets hs_marketable_status to false so he never gets prospect emails |

## Pipeline convention (no new stage)

- Closed Won = setup invoice paid. That is when Commission Status moves to Owed.
- Deal name: "Business name, AI Receptionist" or "Person name, Personal Assistant".
- Deal amount = setup fee only. Monthly goes in Monthly recurring revenue (hs_mrr).

## Code reference (repo MarkMeyerson/sherpaTech.ai)

| File | What it is |
|---|---|
| scripts/hubspot/setup-rep-program.mjs | Creates the property group, properties, both forms, and marks Omer non-marketing |
| src/data/reps.js | One entry per rep: name, slug, blurb, bio, photo, form id, hosted form link |
| src/components/RepPage.jsx | The rep page, rendered from a rep config |

## Where to copy the hosted share links

HubSpot does not return share links through the forms API. For each form:

1. In HubSpot go to Marketing, then Forms (left sidebar, or https://app.hubspot.com/forms/243001979).
2. Open the form ("Rep Lead: Omer" or "Rep Lead Registration").
3. Click Share in the top right of the editor, then the Share link tab.
4. Copy the link. It looks like https://40odiz.share-na2.hsforms.com/<code>, same shape as the /next hosted form.
5. Paste the "Rep Lead: Omer" link into `hostedFormUrl` in `src/data/reps.js` and both links into the forms table above.

## QA performed on /omer, 2026-10-23 (local preview, branch rep-program)

Playwright, Chromium, script in `scripts/qa/omer-page.mjs`. 35 checks, all pass.

| Check | 390x844 | 1366x900 |
|---|---|---|
| No horizontal scroll, 16px gutter at phone width | Pass | Pass |
| Headline, rep pill, prices, minutes note, proof line, three FAQs | Pass | Pass |
| Tap-to-call links (hero button and large number) point at tel:+12029993475 | Pass | Pass |
| Booking button opens Mark's 20-minute booking link | Pass | Pass |
| noindex, nofollow meta tag | Pass | Pass |
| No em dashes, vendor names, SMS, texting, or per-minute price in the rendered page | Pass | Pass |
| Empty email blocks submit, nothing posted | Pass | Pass |
| Failed post shows the fallback message | Pass | Pass |
| Success state copy ("Got it. Mark will reach out within one business day. Omer will check in too.") | Pass (mocked post) | |
| Submission payload: sales_rep = Omer Polanco, rep_intro_date = today at midnight UTC in ms, pageUri keeps utm_source, utm_medium, utm_campaign, pageName set | Pass | |
| /next, /october-7, /cos, /voice-ai still load | Pass | |

Not done: the real test submission (test+rep@sherpatech.ai, "ZZ Test Business"). It needs the real "Rep Lead: Omer" form id, which needs the live script run.

## Open items for Mark

1. Run `scripts/hubspot/setup-rep-program.mjs` from a machine where the token reaches HubSpot, then paste the "Rep Lead: Omer" form id into `formId` in `src/data/reps.js` and the ids into the tables above.
2. Copy the two hosted share links (steps above) into this doc and `src/data/reps.js`.
3. Submit the real test entry on /omer (test+rep@sherpatech.ai, ZZ Test Business) and confirm the contact in HubSpot.
4. Send the "Rep Lead Registration" hosted link to Omer to bookmark on his phone.
