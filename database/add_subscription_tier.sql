-- Aggiunta della gestione delle sottoscrizioni PRO/Premium

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'active';

-- Il tier può essere in futuro controllato a livello di check
-- constraint, ma per ora lo lasciamo testuale per maggiore elasticità ('free', 'pro').

-- Commenti al database per il nuovo campo
COMMENT ON COLUMN public.profiles.subscription_tier IS 'Livello di accesso dell''utente (es. free, pro).';
COMMENT ON COLUMN public.profiles.subscription_status IS 'Stato dell''abbonamento (es. active, canceled, past_due).';
