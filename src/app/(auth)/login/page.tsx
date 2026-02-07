"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Scale, ArrowRight, GraduationCap, AlertTriangle, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-background px-4 py-12">
            <div className="mx-auto w-full max-w-5xl mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Torna alla Home
                </Link>
            </div>

            <div className="mx-auto w-full max-w-5xl grid lg:grid-cols-12 gap-6 items-start">
                {/* LEFT: Login */}
                <div className="lg:col-span-7">
                    <Card className="rounded-2xl border border-border bg-card shadow-sm">
                        <CardHeader className="px-7 pt-7">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Accesso
                                    </p>
                                    <CardTitle className="mt-2 text-2xl md:text-3xl font-serif font-bold text-foreground">
                                        Bentornato
                                    </CardTitle>
                                    <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                                        Accedi al tuo account GIURIMì per continuare il percorso.
                                    </p>
                                </div>

                                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center border border-border">
                                    <Scale className="h-6 w-6 text-muted-foreground" />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="px-7 pb-7">
                            {/* Students CTA */}
                            <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center">
                                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-foreground">
                                            Studenti: accesso gratuito
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                            Se ti sei registrato con email istituzionale, dopo l’accesso potrai completare
                                            la verifica account e sbloccare tutti i corsi.
                                        </p>
                                        <div className="mt-3">
                                            <Link
                                                href="/studenti"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-80"
                                            >
                                                Guida studenti
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-foreground/10"
                                        placeholder="nome@universita.it"
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-foreground">Password</label>
                                        <Link
                                            href="/reset-password"
                                            className="text-xs text-muted-foreground underline underline-offset-4 hover:opacity-80"
                                        >
                                            Hai dimenticato la password?
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showPw ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 pr-12 text-sm text-foreground outline-none focus:ring-2 focus:ring-foreground/10"
                                            placeholder="••••••••••"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPw((v) => !v)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg border border-border bg-card hover:bg-muted/30 flex items-center justify-center"
                                            aria-label={showPw ? "Nascondi password" : "Mostra password"}
                                        >
                                            {showPw ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {error ? (
                                    <div className="rounded-xl border border-border bg-muted/30 p-3">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5" />
                                            <p className="text-sm text-foreground">{error}</p>
                                        </div>
                                    </div>
                                ) : null}

                                <Button type="submit" className="w-full rounded-full" disabled={loading}>
                                    {loading ? "Accesso in corso..." : "Accedi"}
                                </Button>

                                <div className="pt-2 text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                                    <ShieldCheck className="h-4 w-4 mt-0.5" />
                                    <p>
                                        Per sicurezza, alcune azioni richiedono email confermata.
                                        Se ti sei appena registrato, controlla la posta e conferma l’indirizzo.
                                    </p>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="px-7 pb-7 pt-0">
                            <p className="text-sm text-muted-foreground">
                                Non hai un account?{" "}
                                <Link
                                    href="/registrazione"
                                    className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
                                >
                                    Registrati
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>

                {/* RIGHT: Info panel */}
                <div className="lg:col-span-5">
                    <Card className="rounded-2xl border border-border bg-card shadow-sm">
                        <CardHeader className="px-7 pt-7 pb-3">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Nota
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-foreground">
                                Problemi comuni
                            </h3>
                        </CardHeader>

                        <CardContent className="px-7 pb-7 space-y-4">
                            <div className="rounded-xl border border-border bg-background p-4">
                                <p className="text-sm font-semibold text-foreground">Email non confermata</p>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                    Se non riesci ad accedere o alcune funzioni sono bloccate, controlla la tua casella
                                    email e completa la conferma.
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-background p-4">
                                <p className="text-sm font-semibold text-foreground">Accesso studenti</p>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                    Se hai un’email istituzionale, dopo l’accesso vai in dashboard e clicca
                                    <strong> “Verifica account”</strong> per sbloccare i corsi.
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-muted/30 p-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    GIURIMì è un progetto educativo: non fornisce consulenza legale e non sostituisce professionisti.
                                </p>
                            </div>

                            <Link href="/studenti">
                                <Button variant="outline" className="w-full rounded-full">
                                    Guida studenti
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
