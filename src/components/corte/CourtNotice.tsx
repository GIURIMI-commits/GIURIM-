import Link from "next/link";
import { Scale, Users, FileText } from "lucide-react";

export function CourtNotice() {
    return (
        <div className="space-y-6">

            {/* Disclaimer / Intro */}
            <div className="rounded-xl bg-card border border-border/60 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500 font-serif font-bold">
                    <Scale className="h-5 w-5" />
                    <span>La Corte</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Benvenuto nell'aula virtuale di GIURIMì. Qui puoi confrontarti con studenti e tutor su dubbi, casi pratici e metodi di studio.
                </p>

                <div className="flex gap-4 pt-2 border-t border-border/40">
                    <div className="text-center">
                        <span className="block text-lg font-bold text-foreground">1.2k</span>
                        <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Studenti</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-lg font-bold text-foreground">42</span>
                        <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Esperti</span>
                    </div>
                </div>
            </div>

            {/* Rules (Simplified) */}
            <div className="rounded-xl bg-muted/30 border border-border/40 p-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">
                    Regolamento Rapido
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground/80">
                    <li className="flex gap-2">
                        <span>1.</span>
                        <span>Usa un tono professionale.</span>
                    </li>
                    <li className="flex gap-2">
                        <span>2.</span>
                        <span>Niente insulti o flame (Ban immediato).</span>
                    </li>
                    <li className="flex gap-2">
                        <span>3.</span>
                        <span>Cita le fonti quando possibile.</span>
                    </li>
                </ul>
                <Link href="/guidelines" className="block mt-3 text-xs text-primary hover:underline">
                    Leggi il codice completo →
                </Link>
            </div>

            <div className="text-[10px] text-muted-foreground/60 text-center px-4">
                © 2024 GIURIMì Community
            </div>
        </div>
    );
}
