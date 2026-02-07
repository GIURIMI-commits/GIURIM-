-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ENUMS (Safe creation)
do $$ begin
    create type user_role as enum ('student', 'citizen', 'high_school', 'competitor', 'professional', 'creator', 'teacher');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type lesson_status as enum ('not_started', 'in_progress', 'completed');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type survey_type as enum ('self_efficacy', 'nps', 'content_feedback');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type report_type as enum ('inaccuracy', 'unclear', 'bug', 'suggestion');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');
exception
    when duplicate_object then null;
end $$;

-- PROFILES
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  role user_role,
  onboarding_completed boolean default false,
  preferred_path text[], -- array of lesson slugs
  streak_current int default 0,
  streak_best int default 0,
  last_active_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- LESSON PROGRESS
create table if not exists lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text not null,
  status lesson_status default 'not_started',
  completed_at timestamptz,
  time_spent_seconds int default 0,
  unique(user_id, lesson_slug)
);

-- QUIZ ATTEMPTS
create table if not exists quiz_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text not null,
  score decimal(5,2) not null, -- percentage 0-100
  answers jsonb not null, -- [{ questionId, selectedIndex, correct, timeMs }]
  created_at timestamptz default now()
);

-- SURVEYS
create table if not exists surveys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_slug text,
  type survey_type not null,
  score int, -- 1-10
  comment text,
  created_at timestamptz default now()
);

-- RETENTION TESTS
create table if not exists retention_tests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text not null,
  score decimal(5,2),
  scheduled_at timestamptz not null,
  completed_at timestamptz
);

-- REPORTS
create table if not exists reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text,
  type report_type not null,
  message text not null,
  status report_status default 'open',
  created_at timestamptz default now()
);

-- GLOSSARY TERMS
create table if not exists glossary_terms (
  id uuid default uuid_generate_v4() primary key,
  term text unique not null,
  definition_simple text not null,
  definition_technical text,
  examples jsonb, -- ["ex1", "ex2"]
  area_slug text
);

-- LESSON GLOSSARY MAP (N:N)
create table if not exists lesson_glossary_map (
  lesson_slug text not null,
  term_id uuid references glossary_terms(id) on delete cascade not null,
  primary key (lesson_slug, term_id)
);

-- TRIGGERS
-- Auto-create profile on signup
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- =================================================================================================
-- STUDENT ACCESS VERIFICATION SYSTEM
-- =================================================================================================

-- 1. INSTITUTION DOMAINS (Allowlist)
create table if not exists institution_domains (
  id uuid default uuid_generate_v4() primary key,
  domain text unique not null,
  institution_name text not null,
  country text default 'IT',
  type text default 'university', -- 'university', 'school', etc.
  status text default 'active', -- 'active', 'inactive'
  validated_at timestamptz default now(),
  notes text,
  created_at timestamptz default now()
);

-- 2. ENTITLEMENTS (Grants access to features/content)
create table if not exists entitlements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  scope text not null, -- 'all_courses', 'specific_course_id'
  source text not null, -- 'student_verification', 'purchase', 'promo'
  starts_at timestamptz default now(),
  ends_at timestamptz, -- null = forever
  created_at timestamptz default now(),
  unique(user_id, scope, source)
);

-- 3. VERIFICATION REQUESTS (For tracking pending domains)
create table if not exists institution_verification_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  email_domain text not null,
  institution_guess text,
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamptz default now()
);

-- 4. UPDATE PROFILES TABLE (Add student fields)
alter table profiles 
  add column if not exists email text, -- synced from auth.users
  add column if not exists email_domain text,
  add column if not exists student_status text default 'none', -- 'none', 'pending', 'verified', 'rejected'
  add column if not exists student_verified_at timestamptz;

-- 5. TRIGGER: SYNC USER EMAIL & DOMAIN
create or replace function public.sync_user_email()
returns trigger as $$
declare
  _email text;
  _domain text;
begin
  _email := new.email;
  _domain := split_part(_email, '@', 2);
  
  update public.profiles
  set email = _email,
      email_domain = _domain
  where id = new.id;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users update/insert (already handled by handle_new_user for insert, but need logic there too)
-- Let's update handle_new_user to include email extraction

create or replace function public.handle_new_user()
returns trigger as $$
declare
  _domain text;
begin
  _domain := split_part(new.email, '@', 2);
  
  insert into public.profiles (id, display_name, email, email_domain)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, _domain);
  return new;
end;
$$ language plpgsql security definer;

-- 6. TRIGGER: AUTO-VERIFY STUDENT ON EMAIL CONFIRMATION
create or replace function public.check_student_verification()
returns trigger as $$
declare
  _is_verified_email boolean;
  _domain text;
  _is_institution boolean;
begin
  -- Check if email is confirmed in auth.users
  _is_verified_email := (new.email_confirmed_at is not null);
  
  -- Get domain from profile (or calculate from new.email if profile not ready, but relying on sync)
  -- Better to calculate from NEW record in auth.users to be atomic
  _domain := split_part(new.email, '@', 2);

  if _is_verified_email then
    -- Check if domain is in allowlist (handling subdomains like studenti.unibo.it)
    select exists (
      select 1 from institution_domains 
      where (_domain = domain OR _domain LIKE '%.' || domain)
      and status = 'active'
    ) into _is_institution;

    if _is_institution then
      -- Update profile status
      update public.profiles
      set student_status = 'verified',
          student_verified_at = now(),
          role = 'student' -- promote to student role
      where id = new.id;

      -- Grant entitlement
      insert into public.entitlements (user_id, scope, source)
      values (new.id, 'all_courses', 'student_verification')
      on conflict (user_id, scope, source) do nothing;
    else
      -- If verified email but not institution, set to pending if it looked like a student signup? 
      -- Or just leave as 'none'/'citizen' unless they requested. 
      -- For now, we only upgrade if match.
      null;
    end if;
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_verified on auth.users;
create trigger on_auth_user_verified
  after update of email_confirmed_at on auth.users
  for each row execute procedure public.check_student_verification();


-- =================================================================================================
-- RLS POLICIES
-- =================================================================================================

-- Enable RLS
alter table profiles enable row level security;
alter table institution_domains enable row level security;
alter table entitlements enable row level security;
alter table institution_verification_requests enable row level security;

-- PROFILES
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- INSTITUTION DOMAINS
drop policy if exists "Public read access to domains" on institution_domains;
create policy "Public read access to domains" on institution_domains for select to authenticated using (true);

drop policy if exists "Admin write access to domains" on institution_domains;
create policy "Admin write access to domains" on institution_domains for all using (false); -- Admin only (bypass RLS or specific role)

-- ENTITLEMENTS
drop policy if exists "Users can view own entitlements" on entitlements;
create policy "Users can view own entitlements" on entitlements for select using (auth.uid() = user_id);

drop policy if exists "No user write access to entitlements" on entitlements;
create policy "No user write access to entitlements" on entitlements for all using (false); -- System/Admin only

-- REQUESTS
drop policy if exists "Users can view own requests" on institution_verification_requests;
create policy "Users can view own requests" on institution_verification_requests for select using (auth.uid() = user_id);

drop policy if exists "Users can create requests" on institution_verification_requests;
create policy "Users can create requests" on institution_verification_requests for insert with check (auth.uid() = user_id);
