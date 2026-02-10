-- Migration: add_cookie_preferences.sql
-- Adds a JSONB column to store user cookie preferences (functional, analytics, marketing).

alter table public.profiles 
add column if not exists cookie_preferences jsonb default '{"functional": true, "analytics": false, "marketing": false}'::jsonb;
