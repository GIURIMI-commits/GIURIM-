
"use client";

import { useState } from "react";
import { createComment } from "@/lib/corte/actions";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommentFormProps {
    threadId: string;
}

export function CommentForm({ threadId }: CommentFormProps) {
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("threadId", threadId);
        formData.append("body", body);

        const result = await createComment(formData);

        if (result?.success) {
            setBody("");
            router.refresh();
        } else {
            alert(result?.error || "Errore sconosciuto");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="relative group">
            <div className="relative">
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Scrivi un commento utile o fai una domanda..."
                    className="w-full min-h-[100px] p-4 pr-14 rounded-xl border border-border bg-background shadow-sm resize-y text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/70"
                />

                <div className="absolute bottom-3 right-3">
                    <Button
                        type="submit"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full shadow-sm"
                        disabled={!body.trim() || loading}
                    >
                        <Send className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 pl-1 opacity-0 group-focus-within:opacity-100 transition-opacity">
                Ricorda di essere gentile e citare le fonti quando possibile.
            </p>
        </form>
    );
}
