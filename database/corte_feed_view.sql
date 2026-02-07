-- View to combine Thread + Author + Room + Stats
-- This avoids the "Could not find relationship" error when joining views in Supabase
create or replace view public.corte_feed as
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

-- Grant permissions
grant select on public.corte_feed to anon, authenticated;
