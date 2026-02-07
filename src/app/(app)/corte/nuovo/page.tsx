"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROOMS } from "@/lib/corte/data";
import { checkModeration } from "@/lib/corte/moderation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function CreateThreadPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [roomId, setRoomId] = useState("");
    const [body, setBody] = useState("");
    const [agreed, setAgreed] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setWarning(null);

        // Client-side moderation check
        const modResult = checkModeration(body, title);

        if (!modResult.valid) {
            setError(modResult.message || "Errore di validazione contenuti.");
            return;
        }

        if (modResult.warning && !warning) {
            // First time showing warning, stop submit
            setWarning(modResult.message || "Attenzione al tono.");
            return;
        }

        // If warning existed but user clicked again (override), or no warning -> proceed
        setLoading(true);

        // Mock submission delay
        await new Promise(r => setTimeout(r, 1000));

        // Redirect to feed
        router.push("/corte");
    };

    const canSubmit = title.length > 5 && body.length > 20 && roomId !== "" && agreed;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link
                href="/corte"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Torna in Corte
            </Link>

            <Card className="rounded-2xl border-border bg-card shadow-sm">
                <CardHeader className="pb-4 border-b border-border/50">
                    <CardTitle className="text-xl font-serif font-bold">Apri una nuova discussione</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Aula Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Scegli l'Aula (Argomento)</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {ROOMS.map(room => (
                                    <button
                                        key={room.id}
                                        type="button"
                                        onClick={() => setRoomId(room.id)}
                                        className={`
                                            flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm border transition-all text-left
                                            ${roomId === room.id
                                                ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                                                : "border-border bg-background hover:bg-muted/50 text-muted-foreground"}
                                        `}
                                    >
                                        <span className="font-semibold truncate">{room.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Titolo della discussione</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Es. Dubbio su dolo eventuale e colpa cosciente"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                maxLength={120}
                            />
                            <p className="text-xs text-muted-foreground text-right">{title.length}/120</p>
                        </div>

                        {/* Body */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Testo</label>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                    placeholder="Spiega bene il tuo dubbio. Se possibile cita gli articoli di legge o le pagine del manuale..."
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm min-h-[200px] resize-y"
                                />
                            </div>
                        </div>

                        {/* Moderation Feedback */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex gap-2 items-start">
                                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}
                        {warning && (
                            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex gap-2 items-start">
                                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold">Attenzione</p>
                                    <p>{warning}</p>
                                    <p className="text-xs mt-1 opacity-80">Clicca di nuovo "Pubblica" se vuoi procedere comunque.</p>
                                </div>
                            </div>
                        )}

                        {/* Agreement */}
                        <div className="flex items-start gap-3 pt-2">
                            <input
                                type="checkbox"
                                id="rules"
                                checked={agreed}
                                onChange={e => setAgreed(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="rules" className="text-sm text-muted-foreground leading-relaxed cursor-pointer select-none">
                                Ho verificato che il mio messaggio sia rispettoso e pertinente all'aula scelta. Capisco che i moderatori possono rimuovere contenuti non idonei.
                            </label>
                        </div>

                        {/* Action */}
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="rounded-full px-8"
                                disabled={!canSubmit || loading}
                            >
                                {loading ? "Pubblicazione..." : "Pubblica in Corte"}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
