# ACS Services — Admin Dashboard & Supabase Integration

This project is a React + Vite app for ACS Services with:
- Customer service request form with toast notifications
- Admin login using Supabase Auth
- Admin dashboard listing registrations with delete support
- Supabase as the source of truth for registrations (no custom server required)

## Quick Start

1) Install dependencies

```
pnpm install
```

2) Create a Supabase project
- Go to https://supabase.com/ and create a project
- Copy your Project URL and anon key
- Enable Email auth provider (Authentication → Providers → Email)
- Create an admin user (Authentication → Users)

3) Configure environment variables
Create `.env` in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4) Create the `registrations` table
Use SQL editor in Supabase:

```
create table if not exists public.registrations (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  phone text not null,
  date text not null,
  units text not null,
  address text not null,
  category text not null
);

-- Enable Row Level Security (recommended)
alter table public.registrations enable row level security;

-- RLS policies
-- Dashboard should require auth for reading/deleting.
-- Public form submissions should be allowed anonymously.

create policy "allow read for authenticated" on public.registrations
  for select using (auth.role() = 'authenticated');

create policy "allow insert for anon" on public.registrations
  for insert with check (auth.role() in ('anon','authenticated'));

create policy "allow delete for authenticated" on public.registrations
  for delete using (auth.role() = 'authenticated');
```

5) Run the app

```
pnpm dev
```

Open http://localhost:5173/ and use your admin email/password to log in.

## Implementation Notes

- Auth: `src/lib/supabaseClient.js` initializes the Supabase client
- Login: `src/pages/AdminLogin.jsx` uses `supabase.auth.signInWithPassword`
- Dashboard: `src/pages/AdminDashboard.jsx` queries and deletes from `public.registrations`
- Form: `src/components/ServiceFormDialog.jsx` inserts new rows into `public.registrations`

## Optional: Secure Backend Endpoints
If you later add a Node server, you can verify Supabase JWTs server-side to restrict access to endpoints. For now, all data ops happen directly via the Supabase client.
