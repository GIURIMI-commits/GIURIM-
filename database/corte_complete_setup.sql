-- ==============================================================================
-- GIURIMì CORTE - COMPLETE MASTER SETUP SCRIPT
-- Esegui questo script INTERAMENTE nella dashboard Supabase per resettare e fixare tutto.
-- ==============================================================================

BEGIN;

-- 1. DROP EXISTING OBJECTS (Clean Slate)
drop view if exists public.corte_feed;
drop view if exists public.corte_thread_stats;
drop table if exists public.corte_votes cascade;
drop table if exists public.corte_comments cascade;
drop table if exists public.corte_threads cascade;
drop table if exists public.corte_rooms cascade;

-- 2. CREATE TABLES

-- Aule (Rooms)
create table public.corte_rooms (
    id uuid not null default gen_random_uuid() primary key,
    slug text not null unique,
    name text not null,
    description text,
    icon text not null, 
    category text not null, 
    "order" integer not null default 0,
    created_at timestamptz not null default now()
);

-- Discussioni (Threads)
-- IMPORTANTE: author_id punta a public.profiles(id)
create table public.corte_threads (
    id uuid not null default gen_random_uuid() primary key,
    room_id uuid not null references public.corte_rooms(id) on delete cascade,
    author_id uuid not null references public.profiles(id) on delete cascade, 
    title text not null,
    body text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Commenti (Comments)
create table public.corte_comments (
    id uuid not null default gen_random_uuid() primary key,
    thread_id uuid not null references public.corte_threads(id) on delete cascade,
    author_id uuid not null references public.profiles(id) on delete cascade,
    parent_id uuid references public.corte_comments(id) on delete cascade,
    body text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Voti (Votes)
create table public.corte_votes (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    target_type text not null check (target_type in ('thread', 'comment')),
    target_id uuid not null,
    vote_type integer not null check (vote_type in (1, -1)),
    created_at timestamptz not null default now(),
    unique(user_id, target_type, target_id)
);

-- 3. ENABLE RLS & POLICIES

alter table public.corte_rooms enable row level security;
alter table public.corte_threads enable row level security;
alter table public.corte_comments enable row level security;
alter table public.corte_votes enable row level security;

-- Public Read Policies
create policy "Rooms Public Read" on public.corte_rooms for select using (true);
create policy "Threads Public Read" on public.corte_threads for select using (true);
create policy "Comments Public Read" on public.corte_comments for select using (true);
create policy "Votes Public Read" on public.corte_votes for select using (true);

-- Auth Write Policies
create policy "Auth Insert Thread" on public.corte_threads for insert with check (auth.uid() = author_id);
create policy "Auth Update Own Thread" on public.corte_threads for update using (auth.uid() = author_id);
create policy "Auth Delete Own Thread" on public.corte_threads for delete using (auth.uid() = author_id);

create policy "Auth Insert Comment" on public.corte_comments for insert with check (auth.uid() = author_id);
create policy "Auth Update Own Comment" on public.corte_comments for update using (auth.uid() = author_id);
create policy "Auth Delete Own Comment" on public.corte_comments for delete using (auth.uid() = author_id);

create policy "Auth Insert Vote" on public.corte_votes for insert with check (auth.uid() = user_id);
create policy "Auth Update Own Vote" on public.corte_votes for update using (auth.uid() = user_id);
create policy "Auth Delete Own Vote" on public.corte_votes for delete using (auth.uid() = user_id);


-- 4. CREATE VIEWS

-- Stats View
create or replace view public.corte_thread_stats as
select 
    t.id as thread_id,
    coalesce(sum(v.vote_type), 0) as score,
    count(distinct c.id) as comments_count,
    max(c.created_at) as last_activity_at
from public.corte_threads t
left join public.corte_votes v on v.target_type = 'thread' and v.target_id = t.id
left join public.corte_comments c on c.thread_id = t.id
group by t.id;

-- Feed View (The one used by Frontend)
create or replace view public.corte_feed as
select 
    t.id,
    t.title,
    t.body,
    t.created_at,
    t.updated_at,
    t.room_id,
    t.author_id,
    p.display_name as author_name,
    r.name as room_name,
    r.slug as room_slug,
    r.icon as room_icon,
    coalesce(s.score, 0) as score,
    coalesce(s.comments_count, 0) as comments_count,
    coalesce(s.last_activity_at, t.created_at) as last_activity_at
from public.corte_threads t
join public.corte_rooms r on r.id = t.room_id
join public.profiles p on p.id = t.author_id
left join public.corte_thread_stats s on s.thread_id = t.id;

-- Grant Permissions
grant select on public.corte_thread_stats to anon, authenticated;
grant select on public.corte_feed to anon, authenticated;


-- 5. SEED INITIAL DATA
insert into public.corte_rooms (slug, name, description, icon, category, "order") values
    ('penale', 'Aula Penale', 'Reati, pene e procedura penale.', 'gavel', 'materie', 10),
    ('civile', 'Aula Civile', 'Contratti, famiglia e successioni.', 'users', 'materie', 20),
    ('costituzionale', 'Dir. Costituzionale', 'Libertà fondamentali e ordinamento.', 'landmark', 'materie', 30),
    ('ue', 'Diritto UE', 'Istituzioni e normative europee.', 'globe', 'materie', 40),
    ('amministrativo', 'Diritto Amministrativo', 'Pubblica amministrazione e cittadini.', 'building', 'materie', 50),
    ('digital', 'AI & Digital', 'Privacy, copyright e nuove tecnologie.', 'cpu', 'materie', 60),
    ('esami', 'Esami & Orali', 'Strategie per superare gli esami.', 'book-open', 'studio', 10),
    ('appunti', 'Riassunti & Appunti', 'Scambio materiale di studio.', 'file-text', 'studio', 20),
    ('cafe', 'Caffè Giuridico', 'Chiacchiere, consigli esami e supporto.', 'coffee', 'community', 10)
on conflict (slug) do nothing;

COMMIT;
