-- Seed Glossary Terms
INSERT INTO glossary_terms (term, definition_simple, definition_technical, area_slug)
VALUES 
('Costituzione', 'La legge fondamentale dello Stato italiano, superiore a tutte le altre leggi.', 'La fonte superprimaria dell''ordinamento giuridico italiano, entrata in vigore il 1 gennaio 1948.', 'area-2-costituzionale'),
('Contratto', 'Un accordo tra due o più parti per creare, modificare o estinguere un rapporto giuridico patrimoniale.', 'Art. 1321 c.c.: L''accordo di due o più parti per costituire, regolare o estinguere tra loro un rapporto giuridico patrimoniale.', 'area-3-privato-civile'),
('Reato', 'Un comportamento che la legge punisce con una sanzione penale (come il carcere o una multa).', 'Un fatto umano tipico, antigiuridico e colpevole, punito dall''ordinamento con una pena.', 'area-4-penale')
ON CONFLICT (term) DO NOTHING;

-- Seed initial test users if needed (usually handled by auth, so skipping here)
