-- Seed Glossary Terms
INSERT INTO glossary_terms (term, definition_simple, definition_technical, area_slug)
VALUES 
('Costituzione', 'La legge fondamentale dello Stato italiano, superiore a tutte le altre leggi.', 'La fonte superprimaria dell''ordinamento giuridico italiano, entrata in vigore il 1 gennaio 1948.', 'area-2-costituzionale'),
('Contratto', 'Un accordo tra due o più parti per creare, modificare o estinguere un rapporto giuridico patrimoniale.', 'Art. 1321 c.c.: L''accordo di due o più parti per costituire, regolare o estinguere tra loro un rapporto giuridico patrimoniale.', 'area-3-privato-civile'),
('Reato', 'Un comportamento che la legge punisce con una sanzione penale (come il carcere o una multa).', 'Un fatto umano tipico, antigiuridico e colpevole, punito dall''ordinamento con una pena.', 'area-4-penale')
ON CONFLICT (term) DO NOTHING;

-- Seed Institution Domains
INSERT INTO institution_domains (domain, institution_name, country, type, notes) VALUES
('uniroma1.it', 'Università di Roma “La Sapienza”', 'IT', 'university', 'Include studenti.uniroma1.it'),
('uniroma2.it', 'Università di Roma “Tor Vergata”', 'IT', 'university', 'Include domini .it'),
('uniroma2.eu', 'Università di Roma “Tor Vergata”', 'IT', 'university', 'Include students.uniroma2.eu'),
('uniroma3.it', 'Università Roma Tre', 'IT', 'university', NULL),
('unibo.it', 'Università di Bologna', 'IT', 'university', 'Include studio.unibo.it'),
('unimi.it', 'Università degli Studi di Milano', 'IT', 'university', 'Include studenti.unimi.it'),
('unipi.it', 'Università di Pisa', 'IT', 'university', 'Include studenti.unipi.it'),
('unipd.it', 'Università di Padova', 'IT', 'university', 'Include studenti.unipd.it'),
('unito.it', 'Università di Torino', 'IT', 'university', 'Include edu.unito.it'),
('unina.it', 'Università di Napoli “Federico II”', 'IT', 'university', 'Include studenti.unina.it'),
('unifi.it', 'Università di Firenze', 'IT', 'university', 'Include studenti.unifi.it'),
('unige.it', 'Università di Genova', 'IT', 'university', 'Include studenti.unige.it'),
('unipa.it', 'Università di Palermo', 'IT', 'university', 'Include studenti.unipa.it'),
('unict.it', 'Università di Catania', 'IT', 'university', 'Include studenti.unict.it'),
('uniba.it', 'Università di Bari “Aldo Moro”', 'IT', 'university', 'Include studenti.uniba.it'),
('unical.it', 'Università della Calabria', 'IT', 'university', 'Include studenti.unical.it'),
('unisalento.it', 'Università del Salento', 'IT', 'university', 'Include studenti.unisalento.it'),
('univr.it', 'Università di Verona', 'IT', 'university', 'Include studenti.univr.it'),
('uninsubria.it', 'Università dell’Insubria', 'IT', 'university', 'Include studenti.uninsubria.it'),
('unimc.it', 'Università di Macerata', 'IT', 'university', 'Include studenti.unimc.it'),
('unipg.it', 'Università di Perugia', 'IT', 'university', 'Include studenti.unipg.it')
ON CONFLICT (domain) DO NOTHING;

-- Seed initial test users if needed (usually handled by auth, so skipping here)
