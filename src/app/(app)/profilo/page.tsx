"use client";

import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
    User,
    ShieldCheck,
    Calendar,
    Lock,
    FileText,
    BadgeCheck,
    Info,
    LogOut,
} from "lucide-react";

export default function ProfilePage() {
    const { profile, loading } = useProfile();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-14">
                <Card className="rounded-2xl">
                    <CardContent className="py-10 text-sm text-muted-foreground">
                        Caricamento profilo…
                    </CardContent>
                </Card>
            </div>
        );
    }

    const displayName = profile?.display_name || "Utente";
    const roleLabel = profile?.role ? profile.role.replace("_", " ") : "ruolo non definito";
    const memberSince = profile?.created_at
        ? new Date(profile.created_at).toLocaleDateString()
        : "-";

    // "Verifica studente" (solo UI): se hai un campo reale tipo profile.is_student_verified
    // sostituisci la condizione qui sotto. Per ora: consideriamo "studente" come badge soft.
    const isStudent = profile?.role === "student";
    const isVerifiedStudent = profile?.student_status === "verified";

    const handleExportData = () => {
        window.location.href = '/api/user/export';
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile.")) return;

        try {
            const res = await fetch('/api/user/delete', { method: 'DELETE' });
            if (res.ok) {
                await supabase.auth.signOut();
                router.push("/");
            } else {
                alert("Errore durante l'eliminazione dell'account.");
            }
        } catch (e) {
            console.error(e);
            alert("Si è verificato un errore.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-10">
            {/* Page header */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
                    Profilo
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Una fotografia chiara del tuo account. GIURIMì minimizza i dati: solo ciò che serve per
                    offrirti un percorso educativo ordinato e verificabile.
                </p>
            </div>

            {/* Identity / Hero card */}
            <Card className="rounded-2xl">
                <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
                                <User className="h-6 w-6" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                                        {displayName}
                                    </h2>

                                    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground capitalize">
                                        {roleLabel}
                                    </span>

                                    {isVerifiedStudent && (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-neutral-900 text-white px-2.5 py-1 text-xs">
                                            <BadgeCheck className="h-3.5 w-3.5" />
                                            Studente verificato
                                        </span>
                                    )}
                                </div>

                                <div className="mt-2 text-xs text-muted-foreground/80 flex items-start gap-2 max-w-2xl">
                                    <Info className="h-4 w-4 mt-0.5" />
                                    <p>
                                        Il badge “Studente verificato” indica che l’accesso completo è stato sbloccato
                                        tramite verifica dell’account studente (es. email istituzionale e verifica).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-col gap-3 md:items-end">
                            <Button variant="outline" onClick={() => router.push("/privacy")} className="gap-2">
                                <FileText className="h-4 w-4" />
                                Privacy
                            </Button>
                            <Button variant="destructive" onClick={handleLogout} className="gap-2">
                                <LogOut className="h-4 w-4" />
                                Disconnetti
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Read-only profile details */}
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Informazioni account</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <InfoTile
                        icon={User}
                        label="Nome visualizzato"
                        value={profile?.display_name || "-"}
                        hint="Usato per mostrarti in dashboard e nella community (se attiva)."
                    />
                    <InfoTile
                        icon={ShieldCheck}
                        label="Ruolo"
                        value={roleLabel}
                        capitalize
                        hint="Serve a personalizzare i percorsi e l’accesso ai contenuti."
                    />
                    <InfoTile
                        icon={Calendar}
                        label="Membro dal"
                        value={memberSince}
                        hint="Data di creazione del profilo GIURIMì."
                    />
                    <InfoTile
                        icon={BadgeCheck}
                        label="Stato studente"
                        value={isVerifiedStudent ? "Verificato" : "Non verificato"}
                        hint={
                            isVerifiedStudent
                                ? "Accesso completo ai corsi studenti."
                                : "Verifica account per sbloccare l’accesso studenti (se idoneo)."
                        }
                    />
                </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Privacy & Sicurezza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Pillar
                            icon={ShieldCheck}
                            title="Minimizzazione"
                            desc="Raccogliamo solo ciò che serve per login, progressi e qualità del percorso."
                        />
                        <Pillar
                            icon={Lock}
                            title="Accessi protetti"
                            desc="I contenuti personali sono accessibili solo al proprietario dell’account (RLS)."
                        />
                        <Pillar
                            icon={FileText}
                            title="Trasparenza"
                            desc="Policy chiare, fonti esplicite e preferenze gestibili senza dark patterns."
                        />
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/20 p-5">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Controllo dei tuoi dati</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Qui potrai trovare (in arrivo) le azioni per scaricare i tuoi dati e richiedere la
                            cancellazione dell’account. GIURIMì è un progetto educativo: la priorità è essere chiari,
                            coerenti e rispettosi della tua privacy.
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" disabled className="justify-start">
                                Scarica i tuoi dati (in arrivo)
                            </Button>
                            <Button variant="outline" disabled className="justify-start">
                                Elimina account (in arrivo)
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/privacy/cookie-preferences")}
                                className="justify-start"
                            >
                                Preferenze cookie
                            </Button>
                        </div>

                        <p className="mt-3 text-xs text-muted-foreground/80">
                            Nota: le azioni “in arrivo” sono placeholder UI. Non cambia la logica, ma prepara la
                            struttura per quando implementerai export/cancellazione.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Closing note in manifesto tone */}
            <Card className="rounded-2xl border border-border bg-neutral-900 text-white">
                <CardContent className="p-6 md:p-8">
                    <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
                        GIURIMì nasce per rendere il diritto comprensibile senza semplificazioni fuorvianti.
                        Qui non “spieghiamo per vincere”: spieghiamo per dare strumenti reali.
                    </p>
                    <p className="mt-3 text-xs text-neutral-400">
                        Progetto educativo. Non è consulenza legale.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

/* ---------- UI helpers (presentational only) ---------- */

function InfoTile({
    icon: Icon,
    label,
    value,
    hint,
    capitalize,
}: {
    icon: any;
    label: string;
    value: string;
    hint?: string;
    capitalize?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">
                    <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className={`mt-1 text-base text-foreground ${capitalize ? "capitalize" : ""}`}>
                        {value}
                    </p>
                    {hint && (
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                            {hint}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Pillar({
    icon: Icon,
    title,
    desc,
}: {
    icon: any;
    title: string;
    desc: string;
}) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-xl border border-border bg-muted/20 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-foreground" />
                </div>
                <h5 className="text-sm font-semibold text-foreground">{title}</h5>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    );
}
