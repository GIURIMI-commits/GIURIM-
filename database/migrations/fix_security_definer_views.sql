-- Migration: fix_security_definer_views.sql
-- Explicitly sets security_invoker = true to enforce RLS on views.

-- 1. DROP views to ensure clean recreation (handling dependencies with CASCADE)
drop view if exists public.corte_feed cascade;
drop view if exists public.corte_thread_stats cascade;

-- 2. RECREATE corte_thread_stats with security_invoker
create or replace view public.corte_thread_stats with (security_invoker = true) as
select 
    t.id as thread_id,
    coalesce(sum(v.vote_type), 0) as score,
    count(distinct c.id) as comments_count,
    max(c.created_at) as last_activity_at
from public.corte_threads t
left join public.corte_votes v on v.target_type = 'thread' and v.target_id = t.id
left join public.corte_comments c on c.thread_id = t.id
group by t.id;

grant select on public.corte_thread_stats to anon, authenticated;


-- 3. RECREATE corte_feed with security_invoker
create or replace view public.corte_feed with (security_invoker = true) as
select 
    t.id,
    t.title,
    t.body,
    t.created_at,
    t.updated_at,
    t.room_id,
    t.author_id,
    
    -- Author Relation
    p.display_name as author_name,
    
    -- Room Relation
    r.name as room_name,
    r.slug as room_slug,
    r.icon as room_icon,
    
    -- Stats Relation (aggregated)
    coalesce(s.score, 0) as score,
    coalesce(s.comments_count, 0) as comments_count,
    coalesce(s.last_activity_at, t.created_at) as last_activity_at

from public.corte_threads t
join public.corte_rooms r on r.id = t.room_id
join public.profiles p on p.id = t.author_id
left join public.corte_thread_stats s on s.thread_id = t.id;

grant select on public.corte_feed to anon, authenticated;
