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

Status: **created 2026-10-23** by running the script locally in PowerShell. Property groups, six properties, both forms, and Omer's non-marketing flag all reported created. Hosted share links still to be copied from the form editor (steps below).

### Property group

| Object | Internal name | Label | Status |
|---|---|---|---|
| contacts | sales_rep_program | Sales Rep Program | created |
| deals | sales_rep_program | Sales Rep Program | created |

### Contact properties

| Internal name | Label | Type | Options / notes | Status |
|---|---|---|---|---|
| sales_rep | Sales Rep | Dropdown | Direct, Omer Polanco, Dr. Tom Campbell | created |
| rep_intro_date | Rep Intro Date | Date | Set by the rep page on submit, or by the rep on the registration form | created |

### Deal properties

| Internal name | Label | Type | Options / notes | Status |
|---|---|---|---|---|
| sales_rep | Sales Rep | Dropdown | Same options as contact | created |
| commission_amount | Commission Amount | Number | 250 or 100 | created |
| commission_status | Commission Status | Dropdown | Not owed, Owed, Paid | created |
| commission_paid_date | Commission Paid Date | Date | | created |

### Forms

Both are classic forms with no CAPTCHA and notifications to mark@sherpatech.ai, same pattern as "Voice AI next step (site)" (fdb57885-ec27-4f9e-a6c1-68ed0d3fecb4).

| Form | Fields | Form id | Hosted link | Status |
|---|---|---|---|---|
| Rep Lead: Omer | first name, last name, email (required), phone, business, what you would want handled, sales_rep (hidden, Omer Polanco), rep_intro_date (hidden, set by the page) | pending | pending | created |
| Rep Lead Registration | same fields, sales_rep as a visible required dropdown, rep_intro_date visible | pending | pending | created |

The forms API does not return hosted links. Open the form in the editor, Share, copy the link, and paste it here and into `src/data/reps.js` (`hostedFormUrl`).

### Omer's own contact

| Item | Value |
|---|---|
| Contact | https://app.hubspot.com/contacts/243001979/record/0-1/565662794469 (djomerdmv@gmail.com) |
| sales_rep | left empty on purpose |
| Marketing status | still marketing. The script's API update returned success but HubSpot ignored it (hs_marketable_status is not writable this way). Set it by hand: open his record, Actions, Set as non-marketing. |

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

Real test submission, 2026-10-23, through the page to the live "Rep Lead: Omer" form:

| Item | Value |
|---|---|
| Contact | Test Rep, test+rep@sherpatech.ai, record id 575684944594 |
| Record | https://app.hubspot.com/contacts/243001979/record/0-1/575684944594 |
| sales_rep | Omer Polanco |
| rep_intro_date | 2026-10-23 |
| company | ZZ Test Business |
| Original source | Other campaigns, drill-down 1 "omer-test", drill-down 2 "rep / referral" (the utm values from the page URL) |

Not deleted. Mark removes it by hand.

## Open items for Mark

1. Copy the two hosted share links (steps above) into this doc and `src/data/reps.js`.
2. Delete test contact 575684944594 when done.
3. Set Omer's contact to non-marketing by hand (Actions, Set as non-marketing).
4. Send the "Rep Lead Registration" hosted link to Omer to bookmark on his phone.
