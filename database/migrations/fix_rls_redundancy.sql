-- Migration: fix_rls_redundancy.sql
-- Removes "multiple permissive policies" that are redundant and cause performance warnings.
-- Specifically, policies using `FOR ALL USING (false)` overlap with other policies (like `SELECT`) and are unnecessary because RLS denies by default.

-- 1. ENTITLEMENTS
drop policy if exists "No user write access to entitlements" on entitlements;

-- 2. INSTITUTION DOMAINS
drop policy if exists "Admin write access to domains" on institution_domains;
