"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import {
    Scale,
    ArrowRight,
    GraduationCap,
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Eye,
    EyeOff,
    ArrowLeft,
} from "lucide-react";

type Strength = "weak" | "medium" | "strong";

function evaluatePassword(pw: string) {
    const lengthOK = pw.length >= 10;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSymbol = /[^A-Za-z0-9]/.test(pw);

    const passed = [lengthOK, hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

    let strength: Strength = "weak";
    if (passed >= 4 && lengthOK) strength = "strong";
    else if (passed >= 3) strength = "medium";

    return {
        strength,
        checks: { lengthOK, hasLower, hasUpper, hasNumber, hasSymbol },
        score: passed, // 0..5
    };
}

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showPw2, setShowPw2] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    const pwEval = useMemo(() => evaluatePassword(password), [password]);
    const passwordsMatch = password.length > 0 && password === password2;

    const canSubmit =
        !loading &&
        fullName.trim().length > 1 &&
        email.includes("@") &&
        pwEval.strength === "strong" &&
        passwordsMatch;

    const strengthLabel = useMemo(() => {
        if (!password) return null;
        if (pwEval.strength === "strong") return "Forte";
        if (pwEval.strength === "medium") return "Media";
        return "Debole";
    }, [password, pwEval.strength]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // hard guard (client)
        if (pwEval.strength !== "strong") {
            setError("La password non è abbastanza forte. Completa i requisiti richiesti.");
            return;
        }
        if (!passwordsMatch) {
            setError("Le password non coincidono.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/login?registered=true");
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
                {/* LEFT: Form */}
                <div className="lg:col-span-7">
                    <Card className="rounded-2xl border border-border bg-card shadow-sm">
                        <CardHeader className="px-7 pt-7">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Account
                                    </p>
                                    <CardTitle className="mt-2 text-2xl md:text-3xl font-serif font-bold text-foreground">
                                        Crea il tuo account
                                    </CardTitle>
                                    <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                                        GIURIMì è un progetto educativo: contenuti chiari, verificabili, senza “legalese”.
                                    </p>
                                </div>

                                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center border border-border">
                                    <Scale className="h-6 w-6 text-muted-foreground" />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="px-7 pb-7">
                            {/* Student CTA */}
                            <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center">
                                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-foreground">Sei uno studente?</p>
                                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                            Con email istituzionale + verifica account puoi sbloccare gratuitamente tutti i corsi.
                                        </p>
                                        <div className="mt-3">
                                            <Link
                                                href="/studenti"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-80"
                                            >
                                                Scopri come funziona
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-4">
                                <Field label="Nome completo">
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-foreground/10"
                                        placeholder="Es. Alessio Sabatino"
                                        autoComplete="name"
                                    />
                                </Field>

                                <Field
                                    label="Email"
                                    hint="Se hai un’email istituzionale, usala qui per la verifica studenti."
                                >
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-foreground/10"
                                        placeholder="nome@universita.it"
                                        autoComplete="email"
                                    />
                                </Field>

                                {/* Password */}
                                <Field
                                    label="Password"
                                    hint="Min 10 caratteri, maiuscola, minuscola, numero e simbolo."
                                >
                                    <div className="relative">
                                        <input
                                            type={showPw ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 pr-12 text-sm text-foreground outline-none focus:ring-2 focus:ring-foreground/10"
                                            placeholder="••••••••••"
                                            autoComplete="new-password"
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

                                    {/* Strength meter */}
                                    <div className="mt-3 rounded-xl border border-border bg-muted/20 p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                Robustezza
                                            </p>
                                            <p className="text-xs font-semibold text-foreground">
                                                {strengthLabel ?? "—"}
                                            </p>
                                        </div>

                                        <div className="mt-3 flex gap-2">
                                            <StrengthBar active={password.length > 0} filled={pwEval.score >= 2} />
                                            <StrengthBar active={password.length > 0} filled={pwEval.score >= 3} />
                                            <StrengthBar active={password.length > 0} filled={pwEval.score >= 4} />
                                            <StrengthBar active={password.length > 0} filled={pwEval.score >= 5} />
                                        </div>

                                        <ul className="mt-4 space-y-2">
                                            <Rule ok={pwEval.checks.lengthOK} label="Almeno 10 caratteri" />
                                            <Rule ok={pwEval.checks.hasUpper} label="Almeno una lettera maiuscola" />
                                            <Rule ok={pwEval.checks.hasLower} label="Almeno una lettera minuscola" />
                                            <Rule ok={pwEval.checks.hasNumber} label="Almeno un numero" />
                                            <Rule ok={pwEval.checks.hasSymbol} label="Almeno un simbolo" />
                                        </ul>
                                    </div>
                                </Field>

                                {/* Confirm password */}
                                <Field label="Conferma password">
                                    <div className="relative">
                                        <input
                                            type={showPw2 ? "text" : "password"}
                                            required
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 pr-12 text-sm text-foreground outline-none focus:ring-2 focus:ring-foreground/10"
                                            placeholder="••••••••••"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPw2((v) => !v)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg border border-border bg-card hover:bg-muted/30 flex items-center justify-center"
                                            aria-label={showPw2 ? "Nascondi password" : "Mostra password"}
                                        >
                                            {showPw2 ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>

                                    {password2.length > 0 ? (
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            {passwordsMatch ? (
                                                <span className="inline-flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Le password coincidono
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    Le password non coincidono
                                                </span>
                                            )}
                                        </p>
                                    ) : null}
                                </Field>

                                {error ? (
                                    <div className="rounded-xl border border-border bg-muted/30 p-3">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5" />
                                            <p className="text-sm text-foreground">{error}</p>
                                        </div>
                                    </div>
                                ) : null}

                                <Button type="submit" className="w-full rounded-full" disabled={!canSubmit}>
                                    {loading ? "Creazione account..." : "Registrati"}
                                </Button>

                                <div className="pt-2 text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                                    <ShieldCheck className="h-4 w-4 mt-0.5" />
                                    <p>
                                        Riceverai un’email di conferma. Dopo la conferma, potrai accedere.
                                        Se sei studente, in dashboard troverai il pulsante <strong>“Verifica account”</strong>.
                                    </p>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="px-7 pb-7 pt-0">
                            <p className="text-sm text-muted-foreground">
                                Hai già un account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
                                >
                                    Accedi
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>

                {/* RIGHT: Side panel */}
                <div className="lg:col-span-5">
                    <Card className="rounded-2xl border border-border bg-card shadow-sm">
                        <CardHeader className="px-7 pt-7 pb-3">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Prima di iniziare
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-foreground">
                                Cosa succede dopo la registrazione
                            </h3>
                        </CardHeader>

                        <CardContent className="px-7 pb-7 space-y-4">
                            <StepLine
                                title="1) Conferma email"
                                desc="Clicca sul link che ricevi in posta (serve a verificare l’indirizzo)."
                            />
                            <StepLine
                                title="2) Accedi"
                                desc="Dopo la conferma, entra nella piattaforma con le tue credenziali."
                            />
                            <StepLine
                                title="3) Studenti: verifica account"
                                desc="Se la tua email è istituzionale, clicca “Verifica account” per sbloccare tutto gratis."
                            />

                            <div className="mt-3 rounded-xl border border-border bg-muted/30 p-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    GIURIMì è un progetto educativo: non è consulenza legale e non sostituisce professionisti.
                                    Le lezioni includono rimandi a fonti ufficiali per verifica e approfondimento.
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

/* ---------- UI pieces ---------- */

function Field({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-end justify-between gap-4">
                <label className="text-sm font-medium text-foreground">{label}</label>
                {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
            </div>
            {children}
        </div>
    );
}

function StepLine({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    );
}

function Rule({ ok, label }: { ok: boolean; label: string }) {
    return (
        <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
                className={[
                    "h-4 w-4 rounded-full border border-border flex items-center justify-center",
                    ok ? "bg-foreground text-background" : "bg-background",
                ].join(" ")}
                aria-hidden="true"
            >
                {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
            </span>
            <span className={ok ? "text-foreground" : undefined}>{label}</span>
        </li>
    );
}

function StrengthBar({ active, filled }: { active: boolean; filled: boolean }) {
    return (
        <div
            className={[
                "h-2 flex-1 rounded-full border border-border transition-colors",
                !active ? "bg-muted/20" : filled ? "bg-foreground" : "bg-muted/30",
            ].join(" ")}
        />
    );
}
