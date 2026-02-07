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
    return data.map((item: any) => ({
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
            // category/description not strictly needed for card, but available if we add to view
        } as any,

        stats: {
            score: item.score || 0,
            comments_count: item.comments_count || 0,
        }
    }));
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

    return {
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
        },
        stats: {
            score: data.score,
            comments_count: data.comments_count
        }
    };
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

    return data.map((item: any) => ({
        id: item.id,
        thread_id: item.thread_id,
        parent_id: item.parent_id,
        author_id: item.author_id,
        body: item.body,
        created_at: item.created_at,
        author: {
            display_name: item.author?.display_name || "Utente"
        }
    }));
}
