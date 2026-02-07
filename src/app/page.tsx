"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Scale,
  Users,
  CheckCircle,
  BadgeCheck,
} from "lucide-react";
import clsx from "clsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 relative">
        {/* BACKGROUND (subtle, grayscale, app-like) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {/* soft blobs */}
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px] opacity-70" />
          <div className="absolute -bottom-56 -left-40 h-[600px] w-[600px] rounded-full bg-foreground/5 blur-[130px] opacity-70" />

          {/* grid mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 mask-fade" />

          {/* vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        {/* HERO */}
        <section className="pt-24 pb-16 md:pb-20 px-6 relative z-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex flex-col gap-3">
                  <Badge className="bg-card border border-border text-muted-foreground">
                    <span className="font-semibold text-foreground">GIURIMì</span>
                    <span className="opacity-70">— educazione legale semplice</span>
                  </Badge>

                  <Badge className="bg-card border border-border text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>
                      Per gli studenti è <strong className="text-foreground">100% gratuito</strong>:
                      registrati con <strong className="text-foreground">email istituzionale</strong>
                    </span>
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.05] text-foreground">
                  Il diritto italiano,
                  <br />
                  <span className="text-muted-foreground">finalmente chiaro.</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Non è un manuale. Non è consulenza.
                  <br />
                  È una piattaforma educativa che ti fa capire le regole del gioco:
                  concetto → esempio → schema → quiz → fonte.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link href="/registrazione" className="w-full sm:w-auto">
                    <Button size="lg" className="rounded-full px-8 py-6 text-lg w-full sm:w-auto">
                      Inizia Gratis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <Link href="/learn" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg w-full sm:w-auto"
                    >
                      Vedi il curriculum
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Contenuti verificabili + fonti ufficiali
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    Approccio educativo (no consulenza mascherata)
                  </span>
                </div>
              </div>

              {/* Right: “fake dashboard card” to match app */}
              <div className="relative hidden lg:block">
                <div className="relative">
                  {/* Back card (depth) */}
                  <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-2xl bg-foreground/5 border border-border" />

                  <Card className="relative rounded-2xl border border-border bg-card shadow-sm p-8">
                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                      <div className="h-9 w-44 rounded-full bg-muted" />
                      <div className="flex gap-2">
                        <div className="h-9 w-9 rounded-lg bg-muted" />
                        <div className="h-9 w-9 rounded-lg bg-muted" />
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <Card className="rounded-xl border border-border bg-card shadow-sm p-5">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                          Streak
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-foreground">5</p>
                        <p className="mt-1 text-sm text-muted-foreground">giorni di fila</p>
                      </Card>

                      <Card className="rounded-xl border border-border bg-card shadow-sm p-5">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                          Completate
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-foreground">12</p>
                        <p className="mt-1 text-sm text-muted-foreground">lezioni</p>
                      </Card>
                    </div>

                    <div className="mt-4">
                      <Card className="rounded-xl border border-border bg-card shadow-sm p-6">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
                            <Scale className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Le fonti del diritto</p>
                            <p className="text-sm text-muted-foreground">
                              Capisci la gerarchia in 8 minuti
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="h-2 w-2/3 rounded-full bg-muted overflow-hidden">
                            <div className="h-full w-[45%] bg-foreground/70 rounded-full" />
                          </div>
                          <Link href="/learn/fondamenta/fonti-del-diritto">
                            <Button size="sm" className="rounded-full">
                              Continua
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <MiniPill icon={BookOpen} label="Micro-lezioni" />
                      <MiniPill icon={ShieldCheck} label="Fonti" />
                      <MiniPill icon={Users} label="Community" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES (Card grid like dashboard) */}
        <section className="py-16 md:py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Un metodo che funziona.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Abbiamo decostruito il diritto per ricostruirlo in modo logico.
                Niente memoria cieca: solo comprensione guidata.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <InfoCard
                icon={BookOpen}
                title="Struttura modulare"
                desc="Impari per blocchi logici. Ogni modulo costruisce basi solide per il successivo."
              />
              <InfoCard
                icon={ShieldCheck}
                title="Rigore + chiarezza"
                desc="Semplice non significa superficiale: regole, eccezioni e contesto, con fonti ufficiali."
              />
              <InfoCard
                icon={GraduationCap}
                title="Studenti: gratuito"
                desc="Accesso completo gratis con email istituzionale. Registrati e parti subito."
              />
            </div>

            {/* Secondary split (app-like) */}
            <div className="mt-10 grid lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl border border-border bg-card shadow-sm p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  In 7 giorni
                </p>
                <h3 className="mt-2 text-2xl font-serif font-bold text-foreground">
                  Ti portiamo dalle basi alla mappa mentale.
                </h3>

                <ul className="mt-6 space-y-3 text-muted-foreground">
                  <Bullet>Capisci la gerarchia delle fonti senza confonderti.</Bullet>
                  <Bullet>Leggi un articolo sapendo cosa cercare (regola, eccezioni, soggetti).</Bullet>
                  <Bullet>Capisci cosa fa la Cassazione e perché conta davvero.</Bullet>
                  <Bullet>Fissi i concetti con quiz e feedback, non con “punteggi vuoti”.</Bullet>
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/registrazione" className="w-full sm:w-auto">
                    <Button className="rounded-full w-full sm:w-auto">
                      Registrati
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/chi-siamo" className="w-full sm:w-auto">
                    <Button variant="outline" className="rounded-full w-full sm:w-auto">
                      Leggi la missione
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="rounded-2xl border border-border bg-card shadow-sm p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Trasparenza
                </p>
                <h3 className="mt-2 text-2xl font-serif font-bold text-foreground">
                  Educazione, non scorciatoie.
                </h3>

                <p className="mt-4 text-muted-foreground leading-relaxed">
                  GIURIMì è un progetto educativo: non sostituisce il parere di un professionista.
                  Per questo ogni lezione è strutturata per insegnarti a ragionare, e rimanda a fonti
                  ufficiali per verificare.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <Metric title="Lezioni brevi" value="5–12 min" />
                  <Metric title="Quiz" value="feedback" />
                  <Metric title="Glossario" value="tap-to-learn" />
                  <Metric title="Fonti" value="ufficiali" />
                </div>
              </Card>
            </div>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              Nota: l’accesso gratuito per studenti è riservato a chi registra un’email istituzionale
              e conferma l’indirizzo. I dettagli su gestione e protezione dati sono pubblicati nella privacy policy.
            </p>
          </div>
        </section>

        {/* STATS (grayscale, no textures external) */}
        <section className="py-16 px-6 bg-foreground text-background">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard number="6" label="Aree tematiche" />
              <StatCard number="100+" label="Lezioni interattive" />
              <StatCard number="∞" label="Accesso illimitato" />
              <StatCard number="100%" label="Gratis per studenti" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- Components (dashboard-like) ---------- */

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide",
        className
      )}
    >
      {children}
    </span>
  );
}

function InfoCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-2xl border border-border bg-card shadow-sm p-8 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </Card>
  );
}

function MiniPill({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm px-3 py-2 flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/80 flex-shrink-0" />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-background/15 bg-background/5 p-6">
      <div className="text-4xl font-serif font-bold">{number}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-background/70">{label}</div>
    </div>
  );
}

/* ---------- Tailwind helper (add to globals.css) ----------
.mask-fade {
  -webkit-mask-image: radial-gradient(ellipse at center, black 55%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, black 55%, transparent 75%);
}
---------------------------------------------------------- */
