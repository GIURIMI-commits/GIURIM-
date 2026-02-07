-- FIX handle_new_user trigger for robustness
create or replace function public.handle_new_user()
returns trigger as $$
declare
  _domain text;
begin
  _domain := split_part(new.email, '@', 2);
  
  -- Use ON CONFLICT DO NOTHING to prevent errors if profile already exists
  insert into public.profiles (id, display_name, email, email_domain)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, _domain)
  on conflict (id) do nothing;
  
  return new;
end;
$$ language plpgsql security definer;
