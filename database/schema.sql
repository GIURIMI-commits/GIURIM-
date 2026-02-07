-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ENUMS
create type user_role as enum ('student', 'citizen', 'high_school', 'competitor', 'professional', 'creator', 'teacher');
create type lesson_status as enum ('not_started', 'in_progress', 'completed');
create type survey_type as enum ('self_efficacy', 'nps', 'content_feedback');
create type report_type as enum ('inaccuracy', 'unclear', 'bug', 'suggestion');
create type report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

-- PROFILES
create table profiles (
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
create table lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text not null,
  status lesson_status default 'not_started',
  completed_at timestamptz,
  time_spent_seconds int default 0,
  unique(user_id, lesson_slug)
);

-- QUIZ ATTEMPTS
create table quiz_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text not null,
  score decimal(5,2) not null, -- percentage 0-100
  answers jsonb not null, -- [{ questionId, selectedIndex, correct, timeMs }]
  created_at timestamptz default now()
);

-- SURVEYS
create table surveys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_slug text,
  type survey_type not null,
  score int, -- 1-10
  comment text,
  created_at timestamptz default now()
);

-- RETENTION TESTS
create table retention_tests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text not null,
  score decimal(5,2),
  scheduled_at timestamptz not null,
  completed_at timestamptz
);

-- REPORTS
create table reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_slug text,
  type report_type not null,
  message text not null,
  status report_status default 'open',
  created_at timestamptz default now()
);

-- GLOSSARY TERMS
create table glossary_terms (
  id uuid default uuid_generate_v4() primary key,
  term text unique not null,
  definition_simple text not null,
  definition_technical text,
  examples jsonb, -- ["ex1", "ex2"]
  area_slug text
);

-- LESSON GLOSSARY MAP (N:N)
create table lesson_glossary_map (
  lesson_slug text not null,
  term_id uuid references glossary_terms(id) on delete cascade not null,
  primary key (lesson_slug, term_id)
);

-- TRIGGERS
-- Auto-create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at for profiles
create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
