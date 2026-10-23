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

Status: **pending**. The script has been written and dry-run. It has not been run against the portal because `HUBSPOT_PRIVATE_APP_TOKEN` was not available in the build environment. Fill in the ids below after the live run.

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

## Open items for Mark

1. Add `HUBSPOT_PRIVATE_APP_TOKEN` to the environment and run the script, then fill in the ids above.
2. Copy the two hosted form links from the form editor into this doc and `src/data/reps.js`.
3. Send the "Rep Lead Registration" hosted link to Omer to bookmark on his phone.
