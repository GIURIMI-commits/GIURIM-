import Link from "next/link";
import { Scale, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CourtNotice() {
    return (
        <div className="space-y-6">
            {/* Create CTA */}
            <div className="rounded-xl border border-sidebar-accent bg-sidebar-accent/10 p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-sidebar-accent/20 flex items-center justify-center text-sidebar-foreground">
                        <Scale className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">Hai un dubbio?</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Apri una discussione nella CORTE. Altri studenti o tutor potranno aiutarti a chiarire il concetto.
                </p>
                <Link href="/corte/nuovo" className="block">
                    <Button className="w-full rounded-full text-sm font-medium">
                        Apri un Thread
                    </Button>
                </Link>
            </div>

            {/* Rules */}
            <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Regole dell'aula
                </h3>
                <ul className="space-y-3">
                    <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="text-sidebar-foreground font-bold">•</span>
                        <span>Usa un tono rispettoso e professionale.</span>
                    </li>
                    <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="text-sidebar-foreground font-bold">•</span>
                        <span>Cita sempre gli articoli o le fonti se parli di legge.</span>
                    </li>
                    <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="text-sidebar-foreground font-bold">•</span>
                        <span>Non chiedere pareri legali personali (è vietato).</span>
                    </li>
                </ul>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-muted-foreground px-2">
                <Link href="/privacy" className="hover:underline">Privacy</Link>
                <Link href="/terms" className="hover:underline">Termini</Link>
                <Link href="/guidelines" className="hover:underline">Linee Guida</Link>
                <span>© 2024 GIURIMì</span>
            </div>
        </div>
    );
}
