import Link from "next/link";
import { getAllGlossaryTerms } from "@/lib/content/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Search, ExternalLink, BookOpenText, ShieldCheck } from "lucide-react";

type Source = {
    label: string; // es. "Normattiva"
    href: string;  // url
    kind?: "normattiva" | "gazzetta" | "cortecost" | "parlamento" | "europa" | "altro";
};

export default async function GlossaryPage({
    searchParams,
}: {
    searchParams?: { q?: string };
}) {
    const terms = await getAllGlossaryTerms();

    // Sort terms alphabetically
    terms.sort((a: any, b: any) => a.term.localeCompare(b.term));

    const q = (searchParams?.q ?? "").trim().toLowerCase();
    const filtered = q
        ? terms.filter((t: any) => {
            const hay = `${t.term} ${t.definition_simple ?? ""} ${t.definition_technical ?? ""}`.toLowerCase();
            return hay.includes(q);
        })
        : terms;

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Header (dashboard-like) */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Libreria
                    </p>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                        Glossario giuridico
                    </h1>
                    <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
                        Un dizionario semplice per navigare tra i termini legali più comuni.
                        Ogni voce punta, quando possibile, a fonti istituzionali verificabili.
                    </p>
                </div>

                {/* Search (SSR via querystring) */}
                <form className="w-full md:w-[420px]" action="/glossary" method="get">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-sm">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            name="q"
                            defaultValue={searchParams?.q ?? ""}
                            placeholder="Cerca un termine (es. dolo, contratto, Cassazione)..."
                            className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        />
                        {q ? (
                            <Link
                                href="/glossary"
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                Reset
                            </Link>
                        ) : null}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Suggerimento: puoi cercare anche dentro le definizioni.
                    </p>
                </form>
            </div>

            {/* Institutional sources row */}
            <div className="mt-8">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                            <CardTitle className="text-base font-semibold">
                                Fonti istituzionali consigliate
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Per verificare norme e riferimenti usiamo priorità a fonti ufficiali. Qui trovi i
                            link principali.
                        </p>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <SourcePill
                                title="Normattiva"
                                subtitle="Norme vigenti"
                                href="https://www.normattiva.it/"
                                icon={<LogoNormattiva />}
                            />
                            <SourcePill
                                title="Gazzetta Ufficiale"
                                subtitle="Pubblicazioni"
                                href="https://www.gazzettaufficiale.it/"
                                icon={<LogoGU />}
                            />
                            <SourcePill
                                title="Corte Costituzionale"
                                subtitle="Sentenze"
                                href="https://www.cortecostituzionale.it/"
                                icon={<LogoCorteCost />}
                            />
                            <SourcePill
                                title="Parlamento"
                                subtitle="Iter leggi"
                                href="https://www.parlamento.it/"
                                icon={<LogoParlamento />}
                            />
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Nota: GIURIMì è educativo. Le fonti servono a controllare e approfondire.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Results meta */}
            <div className="mt-10 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {q ? (
                        <>
                            Risultati per <span className="text-foreground font-medium">“{searchParams?.q}”</span>:{" "}
                            <span className="text-foreground font-medium">{filtered.length}</span>
                        </>
                    ) : (
                        <>
                            Termini disponibili:{" "}
                            <span className="text-foreground font-medium">{filtered.length}</span>
                        </>
                    )}
                </p>

                <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpenText className="h-4 w-4" />
                    <span>Definizione semplice + (opzionale) tecnico + fonti</span>
                </div>
            </div>

            {/* Grid */}
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((term: any) => {
                    const sources: Source[] = term.sources ?? []; // se non esiste, fallback sotto
                    return (
                        <Card key={term.id} className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl font-bold text-foreground">
                                    {term.term}
                                </CardTitle>
                                {term.tag ? (
                                    <span className="mt-2 inline-flex w-fit rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                        {term.tag}
                                    </span>
                                ) : null}
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm leading-relaxed text-foreground/90">
                                    {term.definition_simple}
                                </p>

                                {term.definition_technical ? (
                                    <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
                                        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                            Tecnico
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground italic leading-relaxed">
                                            {term.definition_technical}
                                        </p>
                                    </div>
                                ) : null}

                                {/* Sources */}
                                <div className="mt-5">
                                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                        Fonti
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {sources.length > 0 ? (
                                            sources.slice(0, 3).map((s, idx) => (
                                                <a
                                                    key={`${term.id}-src-${idx}`}
                                                    href={s.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                                                >
                                                    <SourceIcon kind={s.kind} />
                                                    <span>{s.label}</span>
                                                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                                                </a>
                                            ))
                                        ) : (
                                            <>
                                                <a
                                                    href="https://www.normattiva.it/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                                                >
                                                    <LogoNormattivaSmall />
                                                    <span>Normattiva</span>
                                                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                                                </a>
                                                <a
                                                    href="https://www.gazzettaufficiale.it/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                                                >
                                                    <LogoGUSmall />
                                                    <span>Gazzetta</span>
                                                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                                                </a>
                                            </>
                                        )}
                                    </div>

                                    {sources.length > 3 ? (
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            +{sources.length - 3} altre fonti
                                        </p>
                                    ) : null}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

/* ---------- UI helpers ---------- */

function SourcePill({
    title,
    subtitle,
    href,
    icon,
}: {
    title: string;
    subtitle: string;
    href: string;
    icon: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card px-4 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
        >
            <div className="h-10 w-10 rounded-xl bg-muted/40 border border-border flex items-center justify-center">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:underline underline-offset-4">
                    {title}
                </p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground opacity-70" />
        </a>
    );
}

function SourceIcon({ kind }: { kind?: Source["kind"] }) {
    switch (kind) {
        case "normattiva":
            return <LogoNormattivaSmall />;
        case "gazzetta":
            return <LogoGUSmall />;
        case "cortecost":
            return <LogoCorteCostSmall />;
        case "parlamento":
            return <LogoParlamentoSmall />;
        default:
            return <BookOpenText className="h-4 w-4 opacity-70" />;
    }
}

/* ---------- Inline “logos” (simple, grayscale, no external assets) ---------- */

function LogoNormattiva() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 7h12v12H6V7Z" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
            <path d="M8 9h8M8 12h8M8 15h6" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
        </svg>
    );
}
function LogoGU() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 6h10v12H7V6Z" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
            <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
            <path d="M10 4h4" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
        </svg>
    );
}
function LogoCorteCost() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4 20 8v2H4V8l8-4Z" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
            <path d="M6 10v10m4-10v10m4-10v10m4-10v10" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
            <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
        </svg>
    );
}
function LogoParlamento() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 7h8v14H8V7Z" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
            <path d="M9 3h6v4H9V3Z" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
            <path d="M10 11h4M10 14h4M10 17h4" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
        </svg>
    );
}

/* small variants */
function LogoNormattivaSmall() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 7h12v12H6V7Z" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
            <path d="M8 10h8M8 13h6" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        </svg>
    );
}
function LogoGUSmall() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 6h10v12H7V6Z" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
            <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        </svg>
    );
}
function LogoCorteCostSmall() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4 20 8v2H4V8l8-4Z" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
            <path d="M6 10v10m4-10v10m4-10v10m4-10v10" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
            <path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
        </svg>
    );
}
function LogoParlamentoSmall() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 7h8v14H8V7Z" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
            <path d="M9 3h6v4H9V3Z" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        </svg>
    );
}
