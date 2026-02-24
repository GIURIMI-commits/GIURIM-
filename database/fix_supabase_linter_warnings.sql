-- FIX SUPABASE LINTER WARNINGS
-- Esegui questo script nell'SQL Editor di Supabase.

-- =================================================================================
-- 1. FIX: Multiple Permissive Policies
-- Rimuove le policy duplicate/ridondanti che rallentano le query
-- =================================================================================

-- glossary_terms
DROP POLICY IF EXISTS "Anon read access to glossary" ON glossary_terms;
DROP POLICY IF EXISTS "Glossary terms are public" ON glossary_terms;
DROP POLICY IF EXISTS "Public read access to glossary" ON glossary_terms;
CREATE POLICY "Public read access to glossary" ON glossary_terms FOR SELECT USING (true);

-- lesson_glossary_map
DROP POLICY IF EXISTS "Glossary map is public" ON lesson_glossary_map;
DROP POLICY IF EXISTS "Public read access to map" ON lesson_glossary_map;
CREATE POLICY "Public read access to map" ON lesson_glossary_map FOR SELECT USING (true);

-- quiz_attempts
DROP POLICY IF EXISTS "Users can insert own attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "Users can view own attempts" ON quiz_attempts;

-- reports
DROP POLICY IF EXISTS "Users can insert reports" ON reports;

-- retention_tests
DROP POLICY IF EXISTS "Users can view own retention tests" ON retention_tests;
DROP POLICY IF EXISTS "Users can update own retention tests" ON retention_tests;


-- =================================================================================
-- 2. FIX: Auth RLS Initialization Plan
-- Ottimizza le performance mettendo la chiamata (select auth.<function>()) 
-- anziché auth.<function>(), per evitare la re-valutazione riga per riga
-- =================================================================================

-- lesson_progress
DROP POLICY IF EXISTS "Users can view own progress" ON lesson_progress;
CREATE POLICY "Users can view own progress" ON lesson_progress FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON lesson_progress;
CREATE POLICY "Users can insert own progress" ON lesson_progress FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON lesson_progress;
CREATE POLICY "Users can update own progress" ON lesson_progress FOR UPDATE USING ((select auth.uid()) = user_id);

-- quiz_attempts
DROP POLICY IF EXISTS "Users can view own quiz" ON quiz_attempts;
CREATE POLICY "Users can view own quiz" ON quiz_attempts FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz" ON quiz_attempts;
CREATE POLICY "Users can insert own quiz" ON quiz_attempts FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- surveys
DROP POLICY IF EXISTS "Users can view own surveys" ON surveys;
CREATE POLICY "Users can view own surveys" ON surveys FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own surveys" ON surveys;
CREATE POLICY "Users can insert own surveys" ON surveys FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- retention_tests
DROP POLICY IF EXISTS "Users can view own retention" ON retention_tests;
CREATE POLICY "Users can view own retention" ON retention_tests FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own retention" ON retention_tests;
CREATE POLICY "Users can insert own retention" ON retention_tests FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own retention" ON retention_tests;
CREATE POLICY "Users can update own retention" ON retention_tests FOR UPDATE USING ((select auth.uid()) = user_id);

-- reports
DROP POLICY IF EXISTS "Users can view own reports" ON reports;
CREATE POLICY "Users can view own reports" ON reports FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own reports" ON reports;
CREATE POLICY "Users can insert own reports" ON reports FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- profili e altre tabelle base (best practice applicata ovunque)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can view own entitlements" ON entitlements;
CREATE POLICY "Users can view own entitlements" ON entitlements FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can view own requests" ON institution_verification_requests;
CREATE POLICY "Users can view own requests" ON institution_verification_requests FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create requests" ON institution_verification_requests;
CREATE POLICY "Users can create requests" ON institution_verification_requests FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
