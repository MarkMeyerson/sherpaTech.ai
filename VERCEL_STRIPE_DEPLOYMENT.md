# Vercel Deployment Instructions for Stripe Configuration

## Environment Variables Setup

To properly configure the Stripe payment links for production deployment on Vercel, follow these steps:

### 1. Access Vercel Dashboard
1. Log into your Vercel dashboard
2. Navigate to your SherpaTech.AI project
3. Go to **Settings** → **Environment Variables**

### 2. Add Required Environment Variables

Add the following environment variable:

**Variable Name:** `VITE_STRIPE_MODE`
**Value:** `test` (for testing) or `real` (for production)
**Environment:** All (Production, Preview, Development)

#### For Testing Phase:
```
VITE_STRIPE_MODE=test
```

#### For Production Release:
```
VITE_STRIPE_MODE=real
```

### 3. Button Behavior by Mode

#### Test Mode (`VITE_STRIPE_MODE=test`):
- **Primary Button:** "Complete Your Payment ($1 Test)" → $1 test link
- **Secondary Button:** "Test $499 Production Link" → $499 real link (for testing both options)

#### Real Mode (`VITE_STRIPE_MODE=real`):
- **Primary Button:** "Complete Your Payment ($499)" → $499 real link
- **No Secondary Button:** Clean production interface

### 4. Deployment Process

1. **Testing Phase:**
   - Set `VITE_STRIPE_MODE=test`
   - Deploy and verify both buttons work correctly:
     - Primary button should show "$1 Test" and link to test payment
     - Secondary orange button should show "Test $499 Production Link"
   - Test the complete payment flow for both links

2. **Production Release:**
   - Change `VITE_STRIPE_MODE=real`
   - Redeploy to activate production mode:
     - Only the primary "$499" button will be visible
     - Clean, professional interface for end users
   - Monitor the first few transactions

### 5. Safety Features

- **Default Mode:** If `VITE_STRIPE_MODE` is not set or has an invalid value, the system defaults to `test` mode for safety
- **Visual Indicators:** Button text clearly shows the price and mode
- **Test Mode Benefits:** In test mode, you can easily test both payment flows from the same page
- **Production Mode:** Clean interface with only the real payment button visible

### 6. Quick Toggle for Support

To quickly switch between test and real mode:

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Edit the `VITE_STRIPE_MODE` variable
3. Change value between `test` and `real`
4. Trigger a new deployment or wait for the next automatic deployment

### 7. Local Development

The `.env` file in the project root is set to `test` mode by default:
```
VITE_STRIPE_MODE=test
```

This ensures local development always uses test payments unless explicitly changed.

### 8. Verification

After deployment, you can verify the configuration by:
1. Navigating to the cohort thank-you page
2. **In Test Mode:** Verify you see both buttons with clear pricing labels
3. **In Real Mode:** Verify you see only one clean payment button
4. Test clicking the buttons to confirm correct Stripe links
5. Check button styling and responsiveness on mobile devices

## Current Stripe Links

- **Test Link ($1):** https://buy.stripe.com/dRm7sL1BG0GF7iag8SeIw01
- **Real Link ($499):** https://buy.stripe.com/dRmbJ1R5W753eKC9KueIw00

## User Experience

### Test Mode Benefits:
- Clear labeling: "$1 Test" vs "Test $499 Production Link"
- Easy testing of both payment flows from one page
- Orange secondary button stands out for testing purposes

### Production Mode Benefits:
- Clean, professional single-button interface
- Clear "$499" pricing in button text
- No confusion for end users

## Troubleshooting

If the wrong link is being used:
1. Check that `VITE_STRIPE_MODE` is set correctly in Vercel
2. Verify the deployment picked up the new environment variable
3. Clear browser cache and hard refresh
4. Check browser console for any error messages

## Security Note

Environment variables starting with `VITE_` are exposed to the browser and included in the build. This is safe for this use case since the Stripe links are public payment links.