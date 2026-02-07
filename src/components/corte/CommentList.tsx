
import { Comment } from "@/lib/corte/types";
import { Button } from "@/components/ui/Button";
import { ThumbsUp, MessageSquare, CornerDownRight } from "lucide-react";

interface CommentListProps {
    comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="py-12 text-center border rounded-xl border-dashed border-border/50 bg-muted/10">
                <p className="text-muted-foreground">Nessun commento ancora. Sii il primo!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 md:gap-4 group">
                    {/* Avatar Column */}
                    <div className="shrink-0">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-muted-foreground text-xs md:text-sm select-none">
                            {(comment.author?.display_name?.[0] || "U").toUpperCase()}
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-baseline justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-foreground">
                                    {comment.author?.display_name || "Utente"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    • {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
                            {comment.body}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-1">
                            <button className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                                <ThumbsUp className="h-3 w-3" />
                                <span>Utile</span>
                            </button>
                            <button className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                                <CornerDownRight className="h-3 w-3" />
                                <span>Rispondi</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
