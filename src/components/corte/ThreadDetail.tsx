
import Link from "next/link";
import { MessageSquare, ThumbsUp, Share2, ArrowLeft, Calendar } from "lucide-react";
import { Thread } from "@/lib/corte/types";
import { Button } from "@/components/ui/Button";

interface ThreadDetailProps {
    thread: Thread;
}

export function ThreadDetail({ thread }: ThreadDetailProps) {
    const room = thread.room;

    return (
        <article className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            {/* Header / Meta */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border/50 pb-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                        {room && (
                            <Link
                                href={`/corte/aula/${room.slug}`}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-semibold hover:bg-secondary/70 transition-colors"
                            >
                                {room.name}
                            </Link>
                        )}
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                            Pubblicato da <span className="font-medium text-foreground">{thread.author?.display_name || "Utente"}</span>
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground leading-tight">
                        {thread.title}
                    </h1>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1 shrink-0 bg-muted/30 px-3 py-1.5 rounded-lg h-fit">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(thread.created_at).toLocaleDateString('it-IT', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })}
                </div>
            </div>

            {/* Body */}
            <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {thread.body}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/50">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full gap-2 h-9 border-border/60">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{thread.stats?.score || 0}</span>
                    </Button>
                    <div className="text-sm text-muted-foreground ml-2">
                        {thread.stats?.comments_count || 0} commenti
                    </div>
                </div>

                <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    Condividi
                </Button>
            </div>
        </article>
    );
}
