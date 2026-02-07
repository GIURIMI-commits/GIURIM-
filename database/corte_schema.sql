-- ==============================================================================
-- GIURIMì CORTE (Forum) Database Schema
-- ==============================================================================

-- 1. CLEANUP (For development iterations)
-- drop table if exists public.corte_votes cascade;
-- drop table if exists public.corte_comments cascade;
-- drop table if exists public.corte_threads cascade;
-- drop table if exists public.corte_rooms cascade;

-- 2. TABLES

-- Aule (Rooms)
create table public.corte_rooms (
    id uuid not null default gen_random_uuid() primary key,
    slug text not null unique,
    name text not null,
    description text,
    icon text not null, -- Lucide icon name
    category text not null, -- 'materie', 'studio', 'community'
    "order" integer not null default 0,
    created_at timestamptz not null default now()
);

-- Discussioni (Threads)
create table public.corte_threads (
    id uuid not null default gen_random_uuid() primary key,
    room_id uuid not null references public.corte_rooms(id) on delete cascade,
    author_id uuid not null references auth.users(id) on delete cascade,
    title text not null,
    body text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Commenti (Comments)
create table public.corte_comments (
    id uuid not null default gen_random_uuid() primary key,
    thread_id uuid not null references public.corte_threads(id) on delete cascade,
    author_id uuid not null references auth.users(id) on delete cascade,
    parent_id uuid references public.corte_comments(id) on delete cascade, -- Null for root comments
    body text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Voti (Votes)
create table public.corte_votes (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    target_type text not null check (target_type in ('thread', 'comment')),
    target_id uuid not null, -- thread_id or comment_id, handled by app logic or composite key checks
    vote_type integer not null check (vote_type in (1, -1)), -- 1 = upvote, -1 = downvote
    created_at timestamptz not null default now(),
    
    unique(user_id, target_type, target_id) -- One vote per user per item
);

-- 3. INDEXES
create index idx_corte_threads_room on public.corte_threads(room_id);
create index idx_corte_threads_author on public.corte_threads(author_id);
create index idx_corte_comments_thread on public.corte_comments(thread_id);
create index idx_corte_comments_parent on public.corte_comments(parent_id);
create index idx_corte_votes_target on public.corte_votes(target_type, target_id);

-- 4. RLS POLICIES (Row Level Security)

-- Enable RLS
alter table public.corte_rooms enable row level security;
alter table public.corte_threads enable row level security;
alter table public.corte_comments enable row level security;
alter table public.corte_votes enable row level security;

-- Rooms: Public Read, Admin Write (Seed only usually)
create policy "Rooms are viewable by everyone" 
on public.corte_rooms for select using (true);

-- Threads: Public Read, Auth Write
create policy "Threads are viewable by everyone" 
on public.corte_threads for select using (true);

create policy "Authenticated users can create threads" 
on public.corte_threads for insert 
with check (auth.uid() = author_id);

create policy "Users can update own threads" 
on public.corte_threads for update 
using (auth.uid() = author_id);

create policy "Users can delete own threads" 
on public.corte_threads for delete 
using (auth.uid() = author_id);

-- Comments: Public Read, Auth Write
create policy "Comments are viewable by everyone" 
on public.corte_comments for select using (true);

create policy "Authenticated users can create comments" 
on public.corte_comments for insert 
with check (auth.uid() = author_id);

create policy "Users can update own comments" 
on public.corte_comments for update 
using (auth.uid() = author_id);

create policy "Users can delete own comments" 
on public.corte_comments for delete 
using (auth.uid() = author_id);

-- Votes: Public Read, Auth Write
create policy "Votes are viewable by everyone" 
on public.corte_votes for select using (true);

create policy "Authenticated users can vote" 
on public.corte_votes for insert 
with check (auth.uid() = user_id);

create policy "Users can update own votes" 
on public.corte_votes for update 
using (auth.uid() = user_id);

create policy "Users can delete own votes" 
on public.corte_votes for delete 
using (auth.uid() = user_id);


-- 5. VIEWS (Stats aggregation)
-- Simplified view to get thread stats efficiently
create or replace view public.corte_thread_stats as
select 
    t.id as thread_id,
    coalesce(sum(v.vote_type), 0) as score,
    count(distinct c.id) as comments_count,
    max(c.created_at) as last_activity_at -- Latest comment or thread creation
from public.corte_threads t
left join public.corte_votes v on v.target_type = 'thread' and v.target_id = t.id
left join public.corte_comments c on c.thread_id = t.id
group by t.id;


-- 6. SEED DATA (Initial Rooms)
insert into public.corte_rooms (slug, name, description, icon, category, "order") values
    -- MATERIE
    ('penale', 'Aula Penale', 'Reati, pene e procedura penale.', 'gavel', 'materie', 10),
    ('civile', 'Aula Civile', 'Contratti, famiglia e successioni.', 'users', 'materie', 20),
    ('costituzionale', 'Dir. Costituzionale', 'Libertà fondamentali e ordinamento.', 'landmark', 'materie', 30),
    ('ue', 'Diritto UE', 'Istituzioni e normative europee.', 'globe', 'materie', 40),
    ('amministrativo', 'Diritto Amministrativo', 'Pubblica amministrazione e cittadini.', 'building', 'materie', 50), -- Added based on Curriculum
    ('digital', 'AI & Digital', 'Privacy, copyright e nuove tecnologie.', 'cpu', 'materie', 60),
    
    -- STUDIO & ESAMI
    ('esami', 'Esami & Orali', 'Strategie per superare gli esami.', 'book-open', 'studio', 10),
    ('appunti', 'Riassunti & Appunti', 'Scambio materiale di studio.', 'file-text', 'studio', 20),
    
    -- COMMUNITY
    ('cafe', 'Caffè Giuridico', 'Chiacchiere, consigli esami e supporto.', 'coffee', 'community', 10)
on conflict (slug) do nothing;
