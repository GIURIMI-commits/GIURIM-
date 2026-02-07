import Link from "next/link";

const footerLinks = {
    esplora: [
        { label: "Lezioni", href: "/learn" },
        { label: "Glossario", href: "/glossario" },
        { label: "La Corte", href: "/corte" },
        { label: "Chi siamo", href: "/chi-siamo" },
    ],
    studenti: [
        { label: "Guida studenti", href: "/studenti" },
        { label: "Registrazione", href: "/registrazione" },
        { label: "Accedi", href: "/login" },
    ],
    legale: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/privacy/cookie" },
        { label: "Preferenze Cookie", href: "/privacy/cookie-preferences" },
        { label: "Termini di Servizio", href: "/terms" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4">
                {/* Top */}
                <div className="py-12 grid grid-cols-1 gap-10 md:grid-cols-12">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-2xl border border-border bg-card flex items-center justify-center">
                                <span className="font-serif font-bold text-foreground text-lg">G</span>
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-xl tracking-tight text-foreground">
                                    GIURIMì
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">
                                    Educazione giuridica accessibile: concetti chiari, fonti verificabili,
                                    linguaggio semplice.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-border bg-muted/20 p-5 max-w-md">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                GIURIMì è un progetto <strong className="text-foreground">educativo</strong> e{" "}
                                <strong className="text-foreground">open source</strong>. Non fornisce consulenza
                                legale e non sostituisce professionisti.
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-7">
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            <FooterCol title="Esplora">
                                {footerLinks.esplora.map((l) => (
                                    <FooterLink key={l.href} href={l.href}>
                                        {l.label}
                                    </FooterLink>
                                ))}
                            </FooterCol>

                            <FooterCol title="Studenti">
                                {footerLinks.studenti.map((l) => (
                                    <FooterLink key={l.href} href={l.href}>
                                        {l.label}
                                    </FooterLink>
                                ))}
                                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                                    Accesso gratuito con email istituzionale + verifica account.
                                </p>
                            </FooterCol>

                            <FooterCol title="Legale">
                                {footerLinks.legale.map((l) => (
                                    <FooterLink key={l.href} href={l.href}>
                                        {l.label}
                                    </FooterLink>
                                ))}
                                <div className="mt-3">
                                    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                                        Licenza MIT
                                    </span>
                                </div>
                            </FooterCol>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} GIURIMì. Informazioni a scopo educativo.{" "}
                        <span className="text-muted-foreground/80">Non è consulenza legale.</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <Link
                            href="/disclaimer"
                            className="underline underline-offset-4 hover:opacity-80"
                        >
                            Disclaimer educativo
                        </Link>
                        <Link
                            href="/fonti"
                            className="underline underline-offset-4 hover:opacity-80"
                        >
                            Trasparenza fonti
                        </Link>
                        <Link
                            href="/status"
                            className="underline underline-offset-4 hover:opacity-80"
                        >
                            Stato progetto
                        </Link>

                        <span className="hidden md:inline text-muted-foreground/60">•</span>
                        <span className="text-muted-foreground/70">v0.1.0 (Beta)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ---------- UI bits ---------- */

function FooterCol({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-foreground tracking-tight">
                {title}
            </h4>
            <ul className="mt-4 space-y-2">{children}</ul>
        </div>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-transparent hover:decoration-foreground/30"
            >
                {children}
            </Link>
        </li>
    );
}
