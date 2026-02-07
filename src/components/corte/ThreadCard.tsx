import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye, Share2 } from "lucide-react";
import { Thread, ROOMS } from "@/lib/corte/data";
import { Button } from "@/components/ui/Button";

interface ThreadCardProps {
    thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
    const room = ROOMS.find((r) => r.id === thread.roomId);

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
                <span>Pubblicato da {thread.author.name}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Content */}
            <Link href={`/corte/thread/${thread.id}`} className="block group-hover:opacity-90 transition-opacity">
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight font-serif">
                    {thread.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                    {thread.body}
                </p>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {thread.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-muted/40 text-xs font-medium text-muted-foreground border border-border"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 px-3">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-xs font-medium">{thread.stats.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 px-3">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-medium">{thread.stats.comments} commenti</span>
                    </Button>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 mr-2 opacity-70">
                        <Eye className="h-3.5 w-3.5" />
                        {thread.stats.views}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:text-foreground">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
