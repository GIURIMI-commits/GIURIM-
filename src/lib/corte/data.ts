import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Room, Thread, Comment } from "./types";

// Helper to get supabase client
async function getSupabase() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) {
                    // Note: Middleware usually handles setting, but strictly for reading we just need getAll
                },
            },
        }
    );
}

export async function getRooms(): Promise<Room[]> {
    const supabase = await getSupabase();
    const { data } = await supabase.from("corte_rooms").select("*").order("order");
    return data || [];
}

export async function getThreads(roomSlug?: string): Promise<Thread[]> {
    const supabase = await getSupabase();

    // Use the new View 'corte_feed' which has pre-joined data/stats
    let query = supabase
        .from("corte_feed")
        .select("*")
        .order("created_at", { ascending: false });

    if (roomSlug) {
        query = query.eq("room_slug", roomSlug);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching threads:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
        });
        return [];
    }

    // Transform flat view data to nested Thread interface
    const threads: Thread[] = data.map((item: any) => ({
        id: item.id,
        room_id: item.room_id,
        author_id: item.author_id,
        title: item.title,
        body: item.body,
        created_at: item.created_at,
        updated_at: item.updated_at,

        author: {
            display_name: item.author_name || "Utente"
        },
        room: {
            id: item.room_id,
            name: item.room_name,
            slug: item.room_slug,
            icon: item.room_icon,
        } as any,

        stats: {
            score: item.score || 0,
            comments_count: item.comments_count || 0,
            user_vote: 0 // Default
        }
    }));

    // Fetch User Votes if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user && threads.length > 0) {
        const threadIds = threads.map(t => t.id);
        const { data: votes } = await supabase
            .from("corte_votes")
            .select("target_id, vote_type")
            .eq("user_id", user.id)
            .eq("target_type", "thread")
            .in("target_id", threadIds);

        if (votes) {
            const voteMap = new Map(votes.map(v => [v.target_id, v.vote_type]));
            threads.forEach(t => {
                if (t.stats && voteMap.has(t.id)) {
                    t.stats.user_vote = voteMap.get(t.id);
                }
            });
        }
    }

    return threads;
}

export async function getThreadById(id: string): Promise<any> {
    const supabase = await getSupabase();
    console.log("Fetching thread:", id);
    const { data, error } = await supabase
        .from("corte_feed")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching thread:", error);
        return null;
    }

    const thread: Thread = {
        id: data.id,
        room_id: data.room_id,
        author_id: data.author_id,
        title: data.title,
        body: data.body,
        created_at: data.created_at,
        updated_at: data.updated_at,
        author: { display_name: data.author_name || "Utente" },
        room: {
            id: data.room_id,
            name: data.room_name,
            slug: data.room_slug,
            icon: data.room_icon
        } as any,
        stats: {
            score: data.score,
            comments_count: data.comments_count,
            user_vote: 0
        }
    };

    // Fetch User Vote
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: vote } = await supabase
            .from("corte_votes")
            .select("vote_type")
            .eq("user_id", user.id)
            .eq("target_type", "thread")
            .eq("target_id", thread.id)
            .single();

        if (vote && thread.stats) {
            thread.stats.user_vote = vote.vote_type;
        }
    }

    return thread;
}

export async function getComments(threadId: string): Promise<Comment[]> {
    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("corte_comments")
        .select(`
            id, thread_id, parent_id, author_id, body, created_at,
            author:author_id ( display_name )
        `)
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching comments:", error);
        return [];
    }

    const comments: Comment[] = data.map((item: any) => ({
        id: item.id,
        thread_id: item.thread_id,
        parent_id: item.parent_id,
        author_id: item.author_id,
        body: item.body,
        created_at: item.created_at,
        author: {
            display_name: item.author?.display_name || "Utente"
        },
        stats: {
            score: 0, // Comments table doesn't have score in this select yet? 
            // IMPORTANT: We need score for comments. Currently we don't have a view for comments stats.
            // For MVP let's skip score on comments or we need to join votes or create a view.
            // Let's assume 0 for now or fetch it. 
            // To do it right: we should have a 'corte_comments_stats' view or a lateral join.
            // For now: 0.
            user_vote: 0
        }
    }));

    // Fetch User Votes for comments
    const { data: { user } } = await supabase.auth.getUser();
    if (user && comments.length > 0) {
        const commentIds = comments.map(c => c.id);
        const { data: votes } = await supabase
            .from("corte_votes")
            .select("target_id, vote_type")
            .eq("user_id", user.id)
            .eq("target_type", "comment")
            .in("target_id", commentIds);

        if (votes) {
            const voteMap = new Map(votes.map(v => [v.target_id, v.vote_type]));
            comments.forEach(c => {
                if (c.stats && voteMap.has(c.id)) {
                    c.stats.user_vote = voteMap.get(c.id);
                }
            });
        }
    }

    return comments;
}
