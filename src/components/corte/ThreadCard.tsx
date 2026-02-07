import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye, Share2 } from "lucide-react";
import { Thread } from "@/lib/corte/types";
import { Button } from "@/components/ui/Button";
import { VoteControl } from "@/components/corte/VoteControl";

interface ThreadCardProps {
    thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
    const room = thread.room;

    return (
        <div className="group rounded-xl border border-border bg-card p-5 hover:border-sidebar-accent/50 transition-colors shadow-sm">
            {/* Header: Room & Meta */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                {room && (
                    <span className="font-semibold text-sidebar-foreground flex items-center gap-1.5">
                        {/* Simple icon render based on string name is tricky without map, using text for now or generic icon */}
                        <span className="opacity-70">aula/</span>
                        {room.name}
                    </span>
                )}
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>Pubblicato da {thread.author?.display_name || "Utente"}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{new Date(thread.created_at).toLocaleDateString()}</span>
            </div>

            {/* Content */}
            <Link href={`/corte/t/${thread.id}`} className="block group-hover:opacity-90 transition-opacity">
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight font-serif">
                    {thread.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                    {thread.body}
                </p>
            </Link>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-1">
                    {/* Interactive Vote Control */}
                    <div className="mr-2">
                        {/* Prevent link navigation when clicking vote */}
                        <VoteControl
                            targetId={thread.id}
                            targetType="thread"
                            initialScore={thread.stats?.score || 0}
                            initialVote={thread.stats?.user_vote}
                            orientation="horizontal"
                        />
                    </div>

                    <Button variant="ghost" size="sm" className="h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 px-3">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-medium">{thread.stats?.comments_count || 0} commenti</span>
                    </Button>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:text-foreground">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
