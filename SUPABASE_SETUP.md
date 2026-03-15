# 🚀 Supabase Setup Guide for MainframeStudyHub

## Step 1: Create Supabase Project (2 minutes)

1. Go to **https://supabase.com** → Click **Start your project**
2. Sign in with GitHub
3. Click **New Project**
   - Organization: your org (or create one)
   - Name: `mainframestudyhub`
   - Database Password: (save this somewhere safe!)
   - Region: choose closest to your users
4. Click **Create new project** — wait ~1 minute for setup

## Step 2: Run the Database Schema (1 minute)

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the ENTIRE contents of `supabase-schema.sql` and paste it
4. Click **Run** (or Ctrl+Enter)
5. You should see "Success. No rows returned" — that's correct!

## Step 3: Get Your API Keys (30 seconds)

1. Go to **Settings** → **API** (left sidebar)
2. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGci...` (the long one)

## Step 4: Add Keys to Your App (30 seconds)

Open `src/supabaseClient.js` — **already configured with your keys:**

```js
const SUPABASE_URL = "https://xnvxdnltimsmlelpyxeq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

With your actual values:

```js
const SUPABASE_URL = "https://xnvxdnltimsmlelpyxeq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhudnhkbmx0aW1zbWxlbHB5eGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMzcyMjAsImV4cCI6MjA4NzkxMzIyMH0.PFEldS3f6MgegbF5FfnujP5I59kAnFnvXvGzr-vgh9o";
```

✅ **These keys are already configured in `src/supabaseClient.js`** — no action needed for this step.

## Step 5: Configure Auth Settings (1 minute)

1. Go to **Authentication** → **Providers** (left sidebar)
2. **Email** provider should be enabled by default
3. Optional: Under **Authentication** → **Settings**:
   - Toggle OFF **"Confirm email"** for instant signup (recommended for testing)
   - Toggle ON for production (users must verify email)

## Step 6: Build and Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, Vercel, or any static host.

---

## 🔒 What's Secured

| Feature | How |
|---------|-----|
| Passwords | Hashed by Supabase (bcrypt) — never stored in plaintext |
| API Keys | `anon` key is safe to expose — RLS policies protect data |
| Profiles | Row Level Security — users can only edit their own profile |
| Sessions | JWT tokens with auto-refresh |

## 📊 Data Stored in Supabase

| Table | Fields |
|-------|--------|
| `auth.users` | id, email, password (hashed), metadata |
| `profiles` | name, email, role, it_years, mf_years, avatar, join_date |

## 🆓 Supabase Free Tier Limits

- 50,000 monthly active users
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- 50,000 edge function invocations

More than enough for MainframeStudyHub!

---

## Troubleshooting

**"Invalid API key"** → Double-check URL and anon key in `supabaseClient.js`

**"Email not confirmed"** → Either confirm via email link, or disable email confirmation in Auth Settings

**Profile not loading after signup** → Make sure you ran the SQL schema (Step 2). The trigger creates the profile automatically.

**"new row violates row-level security"** → Re-run the SQL schema to ensure RLS policies are created.
