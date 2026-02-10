-- Migration: fix_rls_performance.sql
-- Optimizes RLS policies by wrapping auth functions in (select ...) to prevent per-row re-evaluation.

-- 1. PROFILES
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" on profiles for select using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using ((select auth.uid()) = id);

-- 2. ENTITLEMENTS
drop policy if exists "Users can view own entitlements" on entitlements;
create policy "Users can view own entitlements" on entitlements for select using ((select auth.uid()) = user_id);

-- 3. INSTITUTION VERIFICATION REQUESTS
drop policy if exists "Users can view own requests" on institution_verification_requests;
create policy "Users can view own requests" on institution_verification_requests for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can create requests" on institution_verification_requests;
create policy "Users can create requests" on institution_verification_requests for insert with check ((select auth.uid()) = user_id);

-- 4. CORTE THREADS
drop policy if exists "Authenticated users can create threads" on public.corte_threads;
create policy "Authenticated users can create threads" on public.corte_threads for insert with check ((select auth.uid()) = author_id);

drop policy if exists "Users can update own threads" on public.corte_threads;
create policy "Users can update own threads" on public.corte_threads for update using ((select auth.uid()) = author_id);

drop policy if exists "Users can delete own threads" on public.corte_threads;
create policy "Users can delete own threads" on public.corte_threads for delete using ((select auth.uid()) = author_id);

-- 5. CORTE COMMENTS
drop policy if exists "Authenticated users can create comments" on public.corte_comments;
create policy "Authenticated users can create comments" on public.corte_comments for insert with check ((select auth.uid()) = author_id);

drop policy if exists "Users can update own comments" on public.corte_comments;
create policy "Users can update own comments" on public.corte_comments for update using ((select auth.uid()) = author_id);

drop policy if exists "Users can delete own comments" on public.corte_comments;
create policy "Users can delete own comments" on public.corte_comments for delete using ((select auth.uid()) = author_id);

-- 6. CORTE VOTES
drop policy if exists "Authenticated users can vote" on public.corte_votes;
create policy "Authenticated users can vote" on public.corte_votes for insert with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own votes" on public.corte_votes;
create policy "Users can update own votes" on public.corte_votes for update using ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own votes" on public.corte_votes;
create policy "Users can delete own votes" on public.corte_votes for delete using ((select auth.uid()) = user_id);

-- 7. LESSON PROGRESS (from schema.sql but not previously edited in file, adding here)
-- (Assuming lesson_progress table exists and matches warnings)
drop policy if exists "Users can view own progress" on lesson_progress;
create policy "Users can view own progress" on lesson_progress for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own progress" on lesson_progress;
create policy "Users can insert own progress" on lesson_progress for insert with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own progress" on lesson_progress;
create policy "Users can update own progress" on lesson_progress for update using ((select auth.uid()) = user_id);

-- 8. QUIZ ATTEMPTS
drop policy if exists "Users can view own attempts" on quiz_attempts;
create policy "Users can view own attempts" on quiz_attempts for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own attempts" on quiz_attempts;
create policy "Users can insert own attempts" on quiz_attempts for insert with check ((select auth.uid()) = user_id);

-- 9. SURVEYS
drop policy if exists "Users can insert own surveys" on surveys;
create policy "Users can insert own surveys" on surveys for insert with check ((select auth.uid()) = user_id);

drop policy if exists "Users can view own surveys" on surveys;
create policy "Users can view own surveys" on surveys for select using ((select auth.uid()) = user_id);

-- 10. RETENTION TESTS
drop policy if exists "Users can view own retention tests" on retention_tests;
create policy "Users can view own retention tests" on retention_tests for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can update own retention tests" on retention_tests;
create policy "Users can update own retention tests" on retention_tests for update using ((select auth.uid()) = user_id);

-- 11. REPORTS
drop policy if exists "Users can insert reports" on reports;
create policy "Users can insert reports" on reports for insert with check ((select auth.uid()) = user_id);

drop policy if exists "Users can view own reports" on reports;
create policy "Users can view own reports" on reports for select using ((select auth.uid()) = user_id);
