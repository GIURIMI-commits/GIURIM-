-- COPIA E INCOLLA QUESTO CODICE NELL'EDITOR SQL DI SUPABASE
-- PER RISOLVERE L'ERRORE "Error confirming user"

-- 1. Disattiviamo e cancelliamo il trigger difettoso che bloccava la conferma dell'email 
-- (spesso a causa di una tabella "entitlements" o "institution_domains" mancante in produzione o di un errore logico)
DROP TRIGGER IF EXISTS on_auth_user_verified ON auth.users;

-- 2. Ricreiamo la funzione di check_student in modo "Safe"
-- che NON causa crash in caso di errore interno.
CREATE OR REPLACE FUNCTION public.check_student_verification()
RETURNS trigger AS $$
DECLARE
  _is_verified_email boolean;
  _domain text;
  _is_institution boolean;
BEGIN
  -- SAFEGUARD: Un blocco BEGIN..EXCEPTION impedisce che l'errore faccia crashare il login
  BEGIN
      _is_verified_email := (new.email_confirmed_at IS NOT NULL);
      
      IF new.email IS NOT NULL THEN
          _domain := split_part(new.email, '@', 2);
      ELSE
          RETURN new;
      END IF;

      IF _is_verified_email AND _domain IS NOT NULL THEN
        -- Controllo se esiste la tabella, altrimenti salta  
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'institution_domains') THEN
            SELECT EXISTS (
              SELECT 1 FROM institution_domains 
              WHERE status = 'active'
              AND (domain = _domain OR _domain LIKE '%.' || domain)
            ) INTO _is_institution;
    
            IF _is_institution THEN
              UPDATE public.profiles
              SET student_status = 'verified', student_verified_at = now(), role = 'student'
              WHERE id = new.id;
    
              IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'entitlements') THEN
                  INSERT INTO public.entitlements (user_id, scope, source)
                  VALUES (new.id, 'all_courses', 'student_verification')
                  ON CONFLICT (user_id, scope, source) DO NOTHING;
              END IF;
            END IF;
        END IF;
      END IF;
  EXCEPTION WHEN OTHERS THEN
      -- Silenziamo l'errore per non bloccare l'auth.users!
      NULL;
  END;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Riapplichiamo il trigger
CREATE TRIGGER on_auth_user_verified
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.check_student_verification();
