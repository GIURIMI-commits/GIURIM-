-- =================================================================================================
-- MANUAL VERIFICATION TEST SCRIPT
-- Run this in your Supabase SQL Editor to simulate the full flow
-- =================================================================================================

DO $$
DECLARE
  v_user_id uuid := '00000000-0000-0000-0000-000000000001'; -- Dummy UUID
  v_fake_email text := 'mario.rossi@studenti.unibo.it'; -- Uses a SUBDOMAIN of unibo.it to test the new logic
BEGIN
  -- 1. CLEANUP (in case re-running)
  DELETE FROM auth.users WHERE id = v_user_id;
  -- Profiles/Entitlements cascade delete via FK constraints

  -- 2. SIMULATE SIGNUP (Insert into auth.users)
  INSERT INTO auth.users (
    id, 
    instance_id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    raw_app_meta_data, 
    raw_user_meta_data, 
    created_at, 
    updated_at, 
    role, 
    aud
  ) VALUES (
    v_user_id, 
    '00000000-0000-0000-0000-000000000000', 
    v_fake_email, 
    'encrypted_pass_placeholder', 
    NULL, -- Email NOT confirmed yet
    '{"provider": "email", "providers": ["email"]}', 
    '{"full_name": "Mario Rossi Test"}', 
    now(), 
    now(), 
    'authenticated', 
    'authenticated'
  );

  -- 3. CHECK INITIAL STATE (Should be 'none' or 'pending', no entitlements)
  RAISE NOTICE 'User created. Please check profiles table manually or trust me.';

  -- 4. SIMULATE EMAIL CONFIRMATION (Update auth.users)
  -- This should fire 'check_student_verification' trigger
  UPDATE auth.users 
  SET email_confirmed_at = now(), updated_at = now()
  WHERE id = v_user_id;

END $$;

-- =================================================================================================
-- 5. VERIFY RESULTS
-- Run these queries individually afterwards to confirm success
-- =================================================================================================

-- A) Check Profile Status (Should be 'verified' and role 'student')
SELECT id, email, display_name, role, student_status, student_verified_at 
FROM public.profiles 
WHERE email = 'mario.rossi@studenti.unibo.it';

-- B) Check Entitlements (Should have 1 record)
SELECT * 
FROM public.entitlements 
WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- C) Cleanup (Optional)
-- DELETE FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001';
