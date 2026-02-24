-- SECURITY HARDENING per GIURIMÌ
-- Copia e incolla questo script sull'SQL Editor di Supabase e premi "RUN"
-- Questo script assicurerà che le protezioni (RLS) siano attive su TUTTE le tabelle
-- e che nessuna operazione di INSERT non intenzionale sia permessa da parte di anonimi.

-- 1. Attiviamo RLS su TUTTE le tabelle
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE retention_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_glossary_map ENABLE ROW LEVEL SECURITY;

-- ==========================
-- 2. POLICY ZERO TRUST
-- ==========================

-- PROGRESSI LESSONI
DROP POLICY IF EXISTS "Users can view own progress" ON lesson_progress;
CREATE POLICY "Users can view own progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON lesson_progress;
CREATE POLICY "Users can insert own progress" ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON lesson_progress;
CREATE POLICY "Users can update own progress" ON lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- TENTATIVI QUIZ
DROP POLICY IF EXISTS "Users can view own quiz" ON quiz_attempts;
CREATE POLICY "Users can view own quiz" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz" ON quiz_attempts;
CREATE POLICY "Users can insert own quiz" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- SURVEYS
DROP POLICY IF EXISTS "Users can view own surveys" ON surveys;
CREATE POLICY "Users can view own surveys" ON surveys FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own surveys" ON surveys;
CREATE POLICY "Users can insert own surveys" ON surveys FOR INSERT WITH CHECK (auth.uid() = user_id);

-- TEST DI RITENZIONE
DROP POLICY IF EXISTS "Users can view own retention" ON retention_tests;
CREATE POLICY "Users can view own retention" ON retention_tests FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own retention" ON retention_tests;
CREATE POLICY "Users can insert own retention" ON retention_tests FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own retention" ON retention_tests;
CREATE POLICY "Users can update own retention" ON retention_tests FOR UPDATE USING (auth.uid() = user_id);

-- REPORTS
DROP POLICY IF EXISTS "Users can view own reports" ON reports;
CREATE POLICY "Users can view own reports" ON reports FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reports" ON reports;
CREATE POLICY "Users can insert own reports" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- GLOSSARIO (Pubblico in lettura, nessuna scrittura permesso agli utenti normali)
DROP POLICY IF EXISTS "Public read access to glossary" ON glossary_terms;
CREATE POLICY "Public read access to glossary" ON glossary_terms FOR SELECT TO authenticated USING (true);
-- Permetto lettura pubblica a chi apre API (in Next.js l'API è bloccata agli anonimi se non definita)
-- ma supabase-js farà chiamate anche anonime (se server-side). Nel dubbio: ALLOW ALL in READ.
DROP POLICY IF EXISTS "Anon read access to glossary" ON glossary_terms;
CREATE POLICY "Anon read access to glossary" ON glossary_terms FOR SELECT TO anon USING (true);

-- LESSON GLOSSARY MAP (Stesso come sopra)
DROP POLICY IF EXISTS "Public read access to map" ON lesson_glossary_map;
CREATE POLICY "Public read access to map" ON lesson_glossary_map FOR SELECT USING (true);
