"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createThread(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    // Check Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Devi essere loggato per pubblicare." };
    }

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const roomId = formData.get("roomId") as string;

    if (!title || !body || !roomId) {
        return { error: "Tutti i campi sono obbligatori." };
    }

    // Insert Thread
    const { error } = await supabase.from("corte_threads").insert({
        title,
        body,
        room_id: roomId,
        author_id: user.id
    });

    if (error) {
        console.error("Create thread error:", error);
        return { error: "Errore durante la creazione della discussione." };
    }

    revalidatePath("/corte");
    return { success: true };
}

export async function vote(targetType: 'thread' | 'comment', targetId: string, value: 1 | -1 | 0) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    if (value === 0) {
        // Remove vote
        const { error } = await supabase.from("corte_votes").delete()
            .eq('user_id', user.id)
            .eq('target_type', targetType)
            .eq('target_id', targetId);

        if (error) {
            console.error("Vote delete error:", error);
            return { error: "Failed to remove vote" };
        }
    } else {
        // Update or Insert Vote
        const { error } = await supabase.from("corte_votes").upsert({
            user_id: user.id,
            target_type: targetType,
            target_id: targetId,
            vote_type: value
        }, {
            onConflict: 'user_id, target_type, target_id'
        });

        if (error) {
            console.error("Vote error:", error);
            return { error: "Failed to vote" };
        }
    }

    revalidatePath("/corte");
    return { success: true };
}

export async function createComment(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Devi essere loggato per commentare." };
    }

    const body = formData.get("body") as string;
    const threadId = formData.get("threadId") as string;
    const parentId = formData.get("parentId") as string | null; // Optional for replies

    if (!body || !threadId) {
        return { error: "Commento vuoto o non valido." };
    }

    const { error } = await supabase.from("corte_comments").insert({
        thread_id: threadId,
        author_id: user.id,
        body,
        parent_id: parentId || null // Ensure null if empty string
    });

    if (error) {
        console.error("Create comment error:", error);
        return { error: "Errore durante l'invio del commento." };
    }

    // Revalidate the thread page to show new comment
    // We assume the URL structure is /corte/t/[threadId] but also revalidate the main feed just in case
    // revalidatePath(`/corte/t/${threadId}`); // Cannot use dynamic ID easily here without knowing path, but we can try
    revalidatePath("/corte");
    return { success: true };
}
