import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    ArrowRight,
    GraduationCap,
    CheckCircle2,
    ShieldCheck,
    Mail,
    LogIn,
    BadgeCheck,
    HelpCircle,
} from "lucide-react";

export default function StudentPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                        Studenti
                    </p>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-2">
                        Accesso gratuito a tutti i corsi
                    </h1>
                    <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed text-lg">
                        Se ti registri con un’email istituzionale e completi la verifica account,
                        GIURIMì sblocca automaticamente l’accesso completo a tutti i contenuti.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/registrazione" className="w-full sm:w-auto">
                        <Button className="rounded-full w-full sm:w-auto text-base px-6 py-6">
                            Registrati
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto">
                        <Button variant="outline" className="rounded-full w-full sm:w-auto text-base px-6 py-6">
                            Accedi
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Card */}
            <div className="mt-12">
                <Card className="rounded-3xl border-border bg-card shadow-lg overflow-hidden">
                    <CardHeader className="pb-4 bg-muted/20 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-bold">
                                Come sbloccare tutto (in 60 secondi)
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <MiniStep
                                icon={Mail}
                                title="1) Registrati con email istituzionale"
                                desc="Usa l’email della tua università (es. nome@studenti.unibo.it)."
                            />
                            <MiniStep
                                icon={BadgeCheck}
                                title="2) Conferma l’email"
                                desc="Clicca sul link “Conferma email” che ricevi nella tua casella di posta."
                            />
                            <MiniStep
                                icon={LogIn}
                                title="3) Accedi alla piattaforma"
                                desc="Dopo aver confermato l'email, fai login con le tue nuove credenziali."
                            />
                            <MiniStep
                                icon={CheckCircle2}
                                title="4) Verifica Automatica"
                                desc="Il sistema rileverà il tuo dominio universitario e sbloccherà i corsi."
                            />
                        </div>

                        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 dark:bg-indigo-950/20 dark:border-indigo-900 p-6">
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                                <div>
                                    <p className="text-base font-bold text-indigo-900 dark:text-indigo-100">
                                        Risultato Immediato
                                    </p>
                                    <p className="text-sm text-indigo-700/80 dark:text-indigo-300/80 leading-relaxed mt-1">
                                        Se il dominio della tua email è riconosciuto come istituzionale, il sistema imposta
                                        il tuo profilo come <strong>Studente verificato</strong> e ti garantisce l'accesso
                                        illimitato a <strong>tutti i corsi e le risorse</strong> di GIURIMì.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/registrazione" className="w-full sm:w-auto">
                                <Button className="rounded-full w-full sm:w-auto font-bold">
                                    Inizia ora
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/dashboard" className="w-full sm:w-auto">
                                <Button variant="ghost" className="rounded-full w-full sm:w-auto">
                                    Vai alla Dashboard
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Domain not recognized */}
            <div className="mt-12 grid lg:grid-cols-2 gap-8">
                <Card className="rounded-3xl border-border bg-card shadow-sm h-full flex flex-col">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold">
                            La tua università non è riconosciuta?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            A volte le università usano domini specifici per gli studenti (es. <em>studenti.*</em>, <em>mail.*</em>).
                            Se il tuo dominio non è ancora nel nostro elenco, non preoccuparti.
                        </p>

                        <div className="rounded-xl border border-border bg-muted/30 p-5 mb-6">
                            <p className="text-sm font-medium">
                                ✅ Puoi richiedere l’attivazione del dominio.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Appena verifichiamo che si tratta di un'università italiana, aggiungeremo il dominio e il tuo account verrà sbloccato.
                            </p>
                        </div>

                        <div className="mt-auto">
                            <Link href="/contatti" className="inline-flex w-full sm:w-auto">
                                <Button variant="outline" className="rounded-full w-full sm:w-auto">
                                    Richiedi attivazione dominio
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-border bg-card shadow-sm h-full flex flex-col">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold">
                            Domande Frequenti
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-5">
                        <Faq
                            q="Ho confermato l’email, ma i corsi sono bloccati."
                            a="Assicurati di aver fatto login dopo la conferma. Se vedi ancora il lucchetto, vai nella dashboard: vedrai un banner per completare la verifica o controllare lo stato."
                        />
                        <Faq
                            q="Non ho un’email istituzionale."
                            a="Puoi usare GIURIMì come cittadino. Lo sblocco totale gratuito è un vantaggio riservato agli studenti universitari con email verificata."
                        />
                        <Faq
                            q="Quanto dura l'accesso gratuito?"
                            a="L’accesso resta attivo finché mantieni lo status di studente e rispetti i termini di servizio."
                        />
                        <Faq
                            q="Quali dati conservate?"
                            a="Solo la tua email e lo stato di verifica. Non richiediamo libretti universitari o altri documenti personali."
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Disclaimer */}
            <p className="mt-16 text-center text-xs text-muted-foreground max-w-xl mx-auto">
                GIURIMì è un progetto educativo indipendente. Non fornisce consulenza legale professionale.
                L'accesso studenti è soggetto a termini e condizioni.
            </p>
        </div>
    );
}

/* ---------- UI bits ---------- */

function MiniStep({
    icon: Icon,
    title,
    desc,
}: {
    icon: any;
    title: string;
    desc: string;
}) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="font-bold text-foreground">{title}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function Faq({ q, a }: { q: string; a: string }) {
    return (
        <div className="rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                    <p className="font-semibold text-foreground text-sm">{q}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
            </div>
        </div>
    );
}
