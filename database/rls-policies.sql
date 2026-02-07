-- Enable RLS on all tables
alter table profiles enable row level security;
alter table lesson_progress enable row level security;
alter table quiz_attempts enable row level security;
alter table surveys enable row level security;
alter table retention_tests enable row level security;
alter table reports enable row level security;
alter table glossary_terms enable row level security;
alter table lesson_glossary_map enable row level security;

-- PROFILES
-- Users can read/update their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- LESSON PROGRESS
-- Users can view/insert/update their own progress
create policy "Users can view own progress" on lesson_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on lesson_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress" on lesson_progress
  for update using (auth.uid() = user_id);

-- QUIZ ATTEMPTS
-- Users can view/insert their own attempts
create policy "Users can view own attempts" on quiz_attempts
  for select using (auth.uid() = user_id);

create policy "Users can insert own attempts" on quiz_attempts
  for insert with check (auth.uid() = user_id);

-- SURVEYS
-- Users can insert their own surveys, only admin can view all (admin logic pending)
-- For MVP, users can view their own submissions
create policy "Users can insert own surveys" on surveys
  for insert with check (auth.uid() = user_id);

create policy "Users can view own surveys" on surveys
  for select using (auth.uid() = user_id);

-- RETENTION TESTS
-- Users can view/update their own retention tests
create policy "Users can view own retention tests" on retention_tests
  for select using (auth.uid() = user_id);

create policy "Users can update own retention tests" on retention_tests
  for update using (auth.uid() = user_id);

-- REPORTS
-- Users can insert reports, view their own
create policy "Users can insert reports" on reports
  for insert with check (auth.uid() = user_id);

create policy "Users can view own reports" on reports
  for select using (auth.uid() = user_id);

-- GLOSSARY TERMS
-- Public read access
create policy "Glossary terms are public" on glossary_terms
  for select using (true);

-- LESSON GLOSSARY MAP
-- Public read access
create policy "Glossary map is public" on lesson_glossary_map
  for select using (true);
