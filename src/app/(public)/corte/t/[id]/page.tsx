
import { getThreadById, getComments } from "@/lib/corte/data";
import { ThreadDetail } from "@/components/corte/ThreadDetail";
import { CommentList } from "@/components/corte/CommentList";
import { CommentForm } from "@/components/corte/CommentForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface ThreadPageProps {
    params: Promise<{ id: string }>;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
    const { id } = await params;
    const thread = await getThreadById(id);

    if (!thread) {
        notFound();
    }

    const comments = await getComments(id);

    // Check auth for CommentForm visibility
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) { }
            }
        }
    );
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/corte" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Torna in Corte
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <main className="md:col-span-12 space-y-8">
                    <ThreadDetail thread={thread} />

                    <div className="pt-8 border-t border-border/50">
                        <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                            Discussione ({comments.length})
                        </h3>

                        {user ? (
                            <div className="mb-10">
                                <div className="flex gap-4">
                                    <div className="shrink-0 hidden md:block">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                                            TU
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <CommentForm threadId={thread.id} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-10 p-6 bg-muted/30 rounded-xl text-center border border-border/50">
                                <p className="text-muted-foreground mb-3">Vuoi partecipare alla discussione?</p>
                                <Link href={`/login?next=/corte/t/${thread.id}`} className="font-semibold text-primary hover:underline">
                                    Accedi per commentare
                                </Link>
                            </div>
                        )}

                        <CommentList comments={comments} />
                    </div>
                </main>
            </div>
        </div>
    );
}
