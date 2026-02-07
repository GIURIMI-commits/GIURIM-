"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    BadgeCheck,
    Github,
    Heart,
    Lightbulb,
    Scale,
    ShieldCheck,
    Users,
    ArrowRight,
    Quote,
} from "lucide-react";
import clsx from "clsx";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20 relative overflow-x-hidden">
            {/* Subtle background grid (grayscale, app-like) */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:28px_28px] mask-fade" />
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px]" />
                <div className="absolute -bottom-56 -left-40 h-[600px] w-[600px] rounded-full bg-foreground/5 blur-[130px]" />
            </div>

            {/* HERO */}
            <section className="border-b border-border py-20 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                        Chi siamo
                    </p>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 tracking-tight">
                        Il diritto non deve essere un privilegio.
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        GIURIMì è un progetto educativo che rende la legge italiana comprensibile, senza
                        semplificare in modo scorretto. Non sostituiamo l’avvocato: costruiamo la base che viene
                        prima — la capacità di capire, orientarsi e fare domande migliori.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/registrazione" className="w-full sm:w-auto">
                            <Button size="lg" className="rounded-full px-8 py-6 w-full sm:w-auto">
                                Inizia Gratis
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>

                        <Link href="/learn" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 py-6 w-full sm:w-auto"
                            >
                                Vedi il curriculum
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-8 text-xs text-muted-foreground">
                        Progetto educativo. Nessuna consulenza. Fonti ufficiali e contenuti verificabili.
                    </p>
                </div>
            </section>

            {/* VALUES GRID (card style like dashboard) */}
            <section className="container mx-auto px-6 -mt-10 relative z-10">
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <ValueCard
                        icon={Scale}
                        title="Accessibilità"
                        desc="Rendere le norme comprensibili a chiunque, senza banalizzare i concetti tecnici."
                    />
                    <ValueCard
                        icon={ShieldCheck}
                        title="Verificabilità"
                        desc="Ogni lezione rimanda a fonti ufficiali: quello che leggi deve poter essere controllato."
                    />
                    <ValueCard
                        icon={Users}
                        title="Open Source"
                        desc="Il sapere giuridico è un bene comune: codice e contenuti sono aperti e migliorabili dalla community."
                    />
                </div>
            </section>

            {/* STORY / MANIFESTO */}
            <section className="container mx-auto px-6 py-24 max-w-6xl">
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* Left narrative */}
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold">
                            Perché GIURIMì esiste
                        </h2>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    Il problema: una lingua che esclude
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    In Italia la legge è ovunque, ma spesso parla una lingua che sembra fatta per tenerti
                                    fuori. GIURIMì nasce da una frustrazione precisa: la sensazione di essere sempre un
                                    passo indietro, non per mancanza di studio, ma per mancanza di una mappa chiara.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    La prima spinta: capire davvero
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Ho sempre sentito il bisogno di “tradurre” il diritto in qualcosa di leggibile:
                                    concetti essenziali, esempi concreti, collegamenti logici. Non per semplificare a
                                    tutti i costi, ma per rendere finalmente comprensibile ciò che, nella vita reale,
                                    incide su lavoro, scelte e libertà.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    La seconda spinta: una dedica
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    E poi c’è una motivazione personale. A volte non è l’ambizione a muoverci, ma una
                                    responsabilità silenziosa: la presenza di qualcuno che ti cambia lo sguardo sulle
                                    cose. È una dedica a una persona che mi ha spinto a diventare più chiaro e più
                                    competente — non per dimostrare qualcosa, ma per essere all’altezza.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    La promessa: niente fumo, solo strumenti reali
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Questa è la risposta di GIURIMì: niente scorciatoie e niente “fuffa”. Solo gli
                                    strumenti necessari per capire le regole, orientarsi tra le fonti, fare domande
                                    migliori e smettere di subire ciò che non si comprende.
                                </p>
                            </div>
                        </div>

                        {/* Quote card */}
                        <Card className="rounded-2xl border border-border bg-card shadow-sm p-6">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                                    <Quote className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        “Se capisci le regole, smetti di subirle.”
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Questo è il principio guida di GIURIMì.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Link href="/registrazione" className="w-full sm:w-auto">
                                <Button className="rounded-full w-full sm:w-auto">
                                    Registrati
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href="/chi-siamo#join" className="w-full sm:w-auto">
                                <Button variant="outline" className="rounded-full w-full sm:w-auto">
                                    Unisciti a noi
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right side: “Founder card” + “Community” */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Founder card (grayscale, premium) */}
                        <Card className="rounded-2xl border border-border bg-card shadow-sm p-7">
                            <div className="flex items-start gap-4">
                                <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-foreground font-bold text-xl">
                                    AS
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Founder
                                    </p>
                                    <h3 className="text-xl font-bold text-foreground">
                                        Alessio Sabatino
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                        Ho creato GIURIMì per rendere il diritto leggibile e utile. Un progetto
                                        educativo, costruito come un’app: chiaro, guidato, verificabile.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <MiniTile title="Focus" value="Comprensione" />
                                <MiniTile title="Approccio" value="Educativo" />
                                <MiniTile title="Stile" value="Semplice, serio" />
                                <MiniTile title="Missione" value="Accesso" />
                            </div>
                        </Card>

                        {/* Community / OSS card */}
                        <Card className="rounded-2xl border border-border bg-foreground text-background shadow-sm p-7">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-background/90" />
                                Community driven
                            </h3>

                            <p className="text-sm text-background/75 leading-relaxed mb-6">
                                GIURIMì è costruito con l’aiuto di persone che credono nella missione: giuristi,
                                developer e designer. Se vuoi contribuire, il punto di partenza è GitHub.
                            </p>

                            <a
                                href="https://github.com/GIURIMI-commits/GIURIM-"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-background text-foreground hover:bg-background/90 font-semibold rounded-full">
                                    <Github className="mr-2 h-4 w-4" />
                                    Contribuisci su GitHub
                                </Button>
                            </a>

                            <p className="mt-4 text-xs text-background/60 text-center">
                                v0.1.0 (Beta)
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* TEAM / CONTRIBUTORS */}
            <section id="join" className="bg-card border-t border-border py-20 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <BadgeCheck className="h-12 w-12 text-foreground mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        Chi c’è dietro
                    </h2>
                    <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Oggi dietro GIURIMì ci sono io,{" "}
                        <strong className="text-foreground">Alessio Sabatino</strong>. Domani voglio che sia un
                        progetto di squadra: aperto, serio, e utile davvero.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <TeamMember name="Alessio Sabatino" role="Founder" />

                        {/* You can add more later */}
                        <TeamMember name="—" role="Legal / Editor" muted />
                        <TeamMember name="—" role="Design / UI" muted />

                        <JoinCard />
                    </div>

                    <div className="mt-10">
                        <p className="text-xs text-muted-foreground">
                            A breve aggiungeremo un modulo contatti semplice. Per ora, se vuoi contribuire,
                            passa da GitHub.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ---------- Components ---------- */

function ValueCard({
    icon: Icon,
    title,
    desc,
}: {
    icon: any;
    title: string;
    desc: string;
}) {
    return (
        <Card className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                <Icon className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </Card>
    );
}

function MiniTile({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {title}
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
        </div>
    );
}

function TeamMember({
    name,
    role,
    muted,
}: {
    name: string;
    role: string;
    muted?: boolean;
}) {
    return (
        <div className={clsx(muted && "opacity-60")}>
            <div className="h-24 w-24 mx-auto rounded-full bg-muted border border-border mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold text-2xl">
                    {name === "—" ? "?" : name[0]}
                </div>
            </div>
            <h4 className="font-bold text-foreground">{name}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{role}</p>
        </div>
    );
}

function JoinCard() {
    return (
        <a
            href="https://github.com/GIURIMI-commits/GIURIM-"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
        >
            <div className="h-24 w-24 mx-auto rounded-full bg-background border-2 border-dashed border-border flex items-center justify-center mb-4 group-hover:border-foreground group-hover:text-foreground transition-colors">
                <Lightbulb className="h-8 w-8 text-muted-foreground group-hover:text-foreground" />
            </div>
            <h4 className="font-bold text-foreground group-hover:text-foreground">
                Unisciti a noi
            </h4>
            <p className="text-xs text-muted-foreground">Contribuisci</p>
        </a>
    );
}

/* ---------- CSS helper (add once to globals.css) ----------
.mask-fade {
  -webkit-mask-image: radial-gradient(ellipse at center, black 55%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, black 55%, transparent 75%);
}
---------------------------------------------------------- */
