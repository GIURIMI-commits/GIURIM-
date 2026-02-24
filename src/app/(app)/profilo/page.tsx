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
    LogOut,
    Mail,
    ChevronRight,
    Crown,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

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
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-sm text-primary font-medium tracking-widest uppercase"
                >
                    Sincronizzazione Profilo...
                </motion.div>
            </div>
        );
    }

    const displayName = profile?.display_name || "Utente";
    const roleLabel = profile?.role ? profile.role.replace("_", " ") : "Ospite";
    const memberSince = profile?.created_at
        ? new Date(profile.created_at).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })
        : "-";
    const email = profile?.email || "Email non disponibile";

    // Manteniamo la logica dello Studente Verificato e aggiungiamo il piano PRO
    const isVerifiedStudent = profile?.student_status === "verified";
    const isPro = profile?.subscription_tier === "pro";
    const hasFullAccess = isVerifiedStudent || isPro;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10 lg:py-16">
            <div className="mb-8 md:mb-10 lg:mb-14 text-center md:text-left">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight"
                >
                    Dashboard Personale
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-3 text-muted-foreground max-w-2xl text-base md:text-lg mx-auto md:mx-0"
                >
                    Il tuo centro di controllo GIURIMÌ. Dati al sicuro, essenziali e sotto il tuo dominio.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* --- LEFT COLUMN: Sticky Digital ID Card --- */}
                <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-24 space-y-4 md:space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="rounded-3xl border-border/50 bg-card/60 backdrop-blur-2xl shadow-xl shadow-black/5 overflow-hidden">
                            {/* Decorative Top Banner */}
                            <div className="h-24 w-full bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden">
                                {hasFullAccess && (
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                                )}
                            </div>

                            <CardContent className="px-6 pb-8 pt-0 flex flex-col items-center text-center relative">
                                {/* Giant Avatar */}
                                <div className="h-24 w-24 rounded-full bg-background border-4 border-card/60 shadow-lg flex items-center justify-center -mt-12 mb-4 relative z-10 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                                    <User className="h-10 w-10 text-foreground/80" strokeWidth={1.5} />
                                </div>

                                <h2 className="text-2xl font-serif font-bold text-foreground mb-1">
                                    {displayName}
                                </h2>

                                <div className="flex flex-col items-center gap-2 mt-2">
                                    <span className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                                        {roleLabel}
                                    </span>

                                    {hasFullAccess && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                                            className={`relative inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold overflow-hidden mt-1 shadow-sm ${isPro
                                                    ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-amber-500/10"
                                                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10"
                                                }`}
                                        >
                                            <motion.div
                                                animate={{
                                                    boxShadow: isPro
                                                        ? ["0px 0px 0px 0px rgba(245, 158, 11, 0)", "0px 0px 8px 2px rgba(245, 158, 11, 0.3)", "0px 0px 0px 0px rgba(245, 158, 11, 0)"]
                                                        : ["0px 0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 8px 2px rgba(16, 185, 129, 0.3)", "0px 0px 0px 0px rgba(16, 185, 129, 0)"]
                                                }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                                className="absolute inset-0 rounded-full"
                                            />
                                            {isPro ? <Crown className="h-4 w-4 relative z-10" /> : <BadgeCheck className="h-4 w-4 relative z-10" />}
                                            <span className="relative z-10">{isPro ? "PRO" : "Verificato"}</span>
                                        </motion.span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="px-2"
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-3" />
                            Disconnetti in modo sicuro
                        </Button>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN: Content Dashboard --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="md:col-span-8 lg:col-span-9 space-y-8"
                >

                    {/* VIP Status Banner / Upgrade Options */}
                    {hasFullAccess ? (
                        <motion.div variants={itemVariants} className={`relative rounded-3xl p-[1px] overflow-hidden group shadow-lg ${isPro ? 'shadow-amber-900/5' : 'shadow-emerald-900/5'}`}>
                            <motion.div
                                className={`absolute inset-[-100%] opacity-30 ${isPro ? 'bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#f59e0b_30%,transparent_60%)]' : 'bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#10b981_30%,transparent_60%)]'}`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="relative h-full rounded-3xl bg-card/95 backdrop-blur-xl p-6 md:p-8 z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border ${isPro ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                                        {isPro ? <Crown className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                                    </div>
                                    <div>
                                        <p className={`text-xs uppercase tracking-widest font-bold mb-1.5 ${isPro ? 'text-amber-600 dark:text-amber-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
                                            Privilegi Sbloccati
                                        </p>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                                            {isPro ? "GIURIMÌ PRO Attivo" : "Status Accademico Attivo"}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
                                            Hai l'accesso completo garantito all'intero ecosistema GIURIMÌ, inclusi moduli avanzati, sentenze commentate e funzioni simulazione esame.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className={`h-16 w-16 opacity-10 ${isPro ? 'text-amber-500' : 'text-emerald-500'}`}>
                                        {isPro ? <Crown className="h-full w-full" strokeWidth={1} /> : <BadgeCheck className="h-full w-full" strokeWidth={1} />}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Option 1: Studenti */}
                            <Card className="rounded-3xl border-border/60 bg-gradient-to-br from-card to-muted/20 hover:border-emerald-500/30 transition-colors group cursor-pointer">
                                <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between gap-6">
                                    <div className="space-y-3">
                                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <BadgeCheck className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-foreground">Sei uno Studente?</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">Verifica il tuo account con la mail del tuo ateneo per sbloccare GRATIS l'accesso ai simulatori d'esame e ai quiz.</p>
                                    </div>
                                    <Button variant="default" className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm mt-4">
                                        Verifica la Mail
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Option 2: Professionisti */}
                            <Card className="rounded-3xl border-border/60 bg-gradient-to-br from-card to-muted/20 hover:border-amber-500/30 transition-colors group cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                    <Crown className="h-24 w-24" />
                                </div>
                                <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between gap-6 relative z-10">
                                    <div className="space-y-3">
                                        <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Crown className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-foreground">Concorsi o Lavoro?</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">Diventa un utente <strong className="text-amber-500">GIURIMÌ PRO</strong> per avere accesso alle sezioni estese, casi giuridici pratici e sentenze.</p>
                                    </div>
                                    <Button variant="default" className="w-full rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-semibold shadow-sm mt-4">
                                        Scopri i Piani PRO
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Account Overview Grid */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold text-foreground mb-4 px-2">Panoramica Account</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoTile
                                icon={Mail}
                                label="Indirizzo Email"
                                value={email}
                            />
                            <InfoTile
                                icon={Calendar}
                                label="Membro Dal"
                                value={memberSince}
                                capitalize
                            />
                        </div>
                    </motion.div>

                    {/* Privacy & Security Section */}
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-3xl border-border bg-card shadow-sm overflow-hidden">
                            <CardHeader className="bg-muted/30 border-b border-border/50 pb-6">
                                <CardTitle className="text-lg">Privacy & Gestione Dati</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 space-y-8">
                                {/* Pillars */}
                                <div className="grid gap-6 md:grid-cols-3">
                                    <Pillar
                                        icon={ShieldCheck}
                                        title="Minimizzazione"
                                        desc="Raccogliamo solo i dati essenziali necessari al tuo percorso."
                                        colorClass="text-blue-500 bg-blue-500/10 border-blue-500/20"
                                    />
                                    <Pillar
                                        icon={Lock}
                                        title="Zero Trust"
                                        desc="Infrastruttura database isolata. Nessuno può leggere i tuoi asset."
                                        colorClass="text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                                    />
                                    <Pillar
                                        icon={FileText}
                                        title="Trasparenza"
                                        desc="Controllo totale sulle policy senza alcun dark pattern."
                                        colorClass="text-purple-500 bg-purple-500/10 border-purple-500/20"
                                    />
                                </div>

                                {/* Danger Zone / Actions */}
                                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-destructive mb-1">Zona di Controllo</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Gestisci l'esportazione dei tuoi progressi o richiedi l'estinzione definitiva dell'account dai nostri server in ottemperanza al GDPR.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            className="rounded-xl border-border hover:bg-muted"
                                            onClick={() => router.push("/privacy/cookie-preferences")}
                                        >
                                            Preferenze Cookie
                                        </Button>
                                        <Button variant="outline" disabled className="rounded-xl border-border opacity-50 cursor-not-allowed">
                                            Esporta Dati
                                        </Button>
                                        <Button variant="destructive" disabled className="rounded-xl opacity-50 cursor-not-allowed sm:ml-auto">
                                            Elimina Profilo
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}

/* ---------- UI helpers ---------- */

function InfoTile({
    icon: Icon,
    label,
    value,
    capitalize,
}: {
    icon: any;
    label: string;
    value: string;
    capitalize?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 hover:bg-muted/20 transition-colors w-full overflow-hidden">
            <div className="flex items-start sm:items-center gap-4 w-full">
                <div className="h-10 w-10 mt-1 sm:mt-0 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1 w-full relative">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium truncate">{label}</p>
                    <p className={`mt-0.5 text-base sm:text-lg font-semibold text-foreground break-words sm:break-all ${capitalize ? "capitalize" : ""}`}>
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Pillar({
    icon: Icon,
    title,
    desc,
    colorClass
}: {
    icon: any;
    title: string;
    desc: string;
    colorClass: string;
}) {
    return (
        <div className="space-y-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${colorClass}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h5 className="text-sm font-bold text-foreground mb-1">{title}</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
