# HubSpot SherpaSkill™ Form Implementation Guide

## Portal Information
- **Portal Name**: SherpaTech.AI  
- **Portal ID**: 243001979
- **Plan**: Free CRM
- **Goal**: Capture SherpaSkill™ cohort signups

## Step 1: Create Contact Properties

### 1.1 How did you hear about us?
- Navigate to: Settings → Properties → Contact properties → Create property
- **Property type**: Dropdown select
- **Label**: "How did you hear about us?"
- **Internal name**: `how_did_you_hear`
- **Property group**: Contact Information (or create "SherpaSkill")
- **Options**:
  - LinkedIn → `linkedin`
  - Meetup → `meetup` 
  - Referral → `referral`
  - Other → `other`

### 1.2 Cohort Month
- **Property type**: Dropdown select
- **Label**: "Cohort Month"
- **Internal name**: `sherpaskill_cohort_month`
- **Property group**: SherpaSkill (create new group)
- **Options**:
  - September 2025 → `2025-09`
  - TBA → `tba`

### 1.3 Marketing Consent
- **Property type**: Single checkbox
- **Label**: "I agree to receive emails about SherpaSkill from SherpaTech.AI"
- **Internal name**: `marketing_consent_sherpaskill`
- **Default value**: Unchecked
- **Required**: Yes

### 1.4 Verify Existing Properties
- Confirm these exist (they should by default):
  - `firstname` (First Name)
  - `lastname` (Last Name) 
  - `email` (Email)
  - `company` (Company)
  - `jobtitle` (Job Title)

## Step 2: Create Static List

1. Navigate to: Contacts → Lists → Create list → Contact-based → Static list
2. **List name**: "SherpaSkill Cohort Leads"
3. Save the list

## Step 3: Create the Form

### 3.1 Form Creation
1. Navigate to: Marketing → Lead Capture → Forms
2. Click "Create form" → "Embedded form" → "Regular form"
3. **Form name**: "SherpaSkill Cohort Signup"

### 3.2 Form Fields (in order)
1. **Email** (required)
2. **First Name** (required) 
3. **Last Name** (required)
4. **Company** (optional)
5. **Job Title** (optional) - map to `jobtitle`
6. **How did you hear about us?** (required) - map to `how_did_you_hear`
7. **Cohort Month** (required, default "September 2025") - map to `sherpaskill_cohort_month`
8. **Marketing Consent** (required) - map to `marketing_consent_sherpaskill`

### 3.3 Form Options Configuration
- **Thank you message**: "Thanks! You're signed up for the September SherpaSkill cohort. Watch your inbox for next steps."
- **Always create contact**: Enabled
- **Pre-populate known values**: Enabled
- **Lifecycle stage**: Do not change
- **Notifications**: Send to mark@sherpatech.ai
- **Add to list**: Select "SherpaSkill Cohort Leads"

### 3.4 Publish Form
1. Click "Publish"
2. Copy the **Form ID** (you'll need this)
3. Get the embed code

## Step 4: Get Embed Code

The embed code will look like this (replace ACTUAL_FORM_ID with your real form ID):

```html
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "243001979",
    formId: "ACTUAL_FORM_ID",
    target: "#hs-form"
  });
</script>
```

## Step 5: Test Submission

Submit test data:
- **Email**: test+sherpaskill@sherpatech.ai
- **First Name**: Test
- **Last Name**: Sherpa  
- **Company**: SherpaTech.AI
- **Job Title**: Founder
- **How did you hear**: LinkedIn
- **Cohort Month**: September 2025
- **Marketing Consent**: Checked

## Step 6: Verification Checklist

After form creation, verify:
- [ ] Form appears in Marketing → Lead Capture → Forms
- [ ] All contact properties exist in Settings → Properties
- [ ] Static list "SherpaSkill Cohort Leads" exists
- [ ] Test submission creates/updates contact
- [ ] Test contact appears in the static list
- [ ] Notification email sent to mark@sherpatech.ai

## What You Need to Send Me

Once you've completed the HubSpot setup, please provide:

1. **Form ID** (found in form settings)
2. **Confirmation** that portal ID is 243001979
3. **Region** (should be na1)
4. **Full embed snippet** from HubSpot
5. **Screenshot** of successful test submission

## Quick Implementation Steps

1. **5 minutes**: Create the 3 custom contact properties
2. **2 minutes**: Create the static list  
3. **10 minutes**: Build and configure the form
4. **2 minutes**: Test and verify
5. **1 minute**: Get embed code and form ID

## Next: Update Your React Component

Once you have the form ID, I'll update the SherpaSkill component with the real embed code to replace the placeholders.

---

**Need help with any specific step?** Let me know where you get stuck and I can provide more detailed guidance for that section.
