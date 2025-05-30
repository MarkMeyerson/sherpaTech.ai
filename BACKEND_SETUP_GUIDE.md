# Backend Integration Setup Guide

## 🚀 Quick Start with Supabase

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Choose your organization and enter:
   - **Project Name**: `sherpatech-training`
   - **Database Password**: (choose a secure password)
   - **Region**: (choose closest to your users)
5. Click "Create new project"

### Step 2: Set Up Database
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `database-setup.sql`
4. Click "Run" to execute the SQL
5. You should see success messages for table creation

### Step 3: Get Your API Keys
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **anon public** API key (long string starting with `eyJ...`)

### Step 4: Configure Your App
1. Open `.env.local` in your project root
2. Replace the placeholder values (use VITE_ prefix for Vite projects):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Save the file

### Step 5: Test the Integration
1. Restart your development server: `npm start`
2. Open your app and try registering as a new user
3. Check your Supabase dashboard **Table Editor** to see if user data appears
4. Try logging in as a returning user

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database tables created (users, user_progress, session_logs)
- [ ] API keys copied to `.env.local`
- [ ] App restarted after configuration
- [ ] New user registration works
- [ ] User lookup for returning users works
- [ ] Progress syncs to database (check Table Editor)

## 🔧 Troubleshooting

### "Backend not configured" message
- Check that your `.env.local` file has the correct values
- Restart your development server after changing environment variables
- Make sure there are no spaces around the `=` in your .env file

### User registration fails
- Check browser console for errors
- Verify your Supabase URL and API key are correct
- Make sure Row Level Security policies are set (should be done by the SQL script)

### Data not syncing
- Check browser console for error messages
- Verify network connection
- Check Supabase dashboard for any service issues

## 🎯 What Happens Next

Once configured, your app will:

1. **New Users**: Create account in database, sync progress to cloud
2. **Returning Users**: Find existing account, load progress from cloud
3. **Cross-Device**: Users can access their progress from any device
4. **Offline Fallback**: Still works offline, syncs when connection restored
5. **Activity Logging**: Track user engagement and progress

## 📊 Monitoring Your Data

In Supabase dashboard:
- **Table Editor** → `users`: See all registered users
- **Table Editor** → `user_progress`: See training progress
- **Table Editor** → `session_logs`: See user activity logs

## 🚀 Production Deployment

When ready for production:
1. Update environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Consider upgrading Supabase plan if you exceed free tier limits
3. Set up proper Row Level Security policies for production use
4. Configure custom domain for Supabase (optional)

## 💰 Cost Considerations

**Supabase Free Tier includes:**
- 500MB database storage
- 50,000 monthly active users
- 2GB bandwidth
- Perfect for getting started!

**Paid plans start at $25/month** when you need more resources.

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Review the Supabase logs in your dashboard
3. Refer to [Supabase documentation](https://supabase.com/docs)
4. Check that all environment variables are correctly set
