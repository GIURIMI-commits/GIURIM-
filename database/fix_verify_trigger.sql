-- FIX check_student_verification trigger logic
-- 1. Handle potential NULLs in string concatenation
-- 2. Add exception handling to prevent blocking auth flow
-- 3. Ensure idempotency

create or replace function public.check_student_verification()
returns trigger as $$
declare
  _is_verified_email boolean;
  _domain text;
  _is_institution boolean;
begin
  -- SAFEGUARD: Wrap in block to prevent errors from bubbling up to auth
  begin
      -- Check if email is confirmed in auth.users
      _is_verified_email := (new.email_confirmed_at is not null);
      
      -- Get domain from new.email (safer than profile sync delay)
      if new.email is not null then
          _domain := split_part(new.email, '@', 2);
      else
          return new; -- Should not happen for auth.users but safety first
      end if;

      if _is_verified_email and _domain is not null then
        -- Check if domain is in allowlist (handling subdomains like studenti.unibo.it)
        -- FIXED LOGIC: distinct handling for exact match vs subdomain to avoid concatenation issues
        select exists (
          select 1 from institution_domains 
          where status = 'active'
          and (
              domain = _domain 
              or 
              (_domain like '%.' || domain)
          )
        ) into _is_institution;

        if _is_institution then
          -- Update profile status
          update public.profiles
          set student_status = 'verified',
              student_verified_at = now(),
              role = 'student'
          where id = new.id;

          -- Grant entitlement
          insert into public.entitlements (user_id, scope, source)
          values (new.id, 'all_courses', 'student_verification')
          on conflict (user_id, scope, source) do nothing;
        end if;
      end if;
  exception when others then
      -- Log error if possible, or just ignore to allow auth to proceed
      -- raise notice 'Error in check_student_verification: %', SQLERRM;
      null;
  end;

  return new;
end;
$$ language plpgsql security definer;
