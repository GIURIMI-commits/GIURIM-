import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Scale, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna alla Home
            </Link>

            <header className="mb-12 border-b border-border pb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Scale className="h-8 w-8 text-foreground" />
                    <h1 className="text-4xl font-serif font-bold text-foreground">Termini di Servizio</h1>
                </div>
                <p className="text-muted-foreground">
                    Accettando di utilizzare GIURIMì, accetti le seguenti condizioni. Leggile con attenzione.
                </p>
            </header>

            {/* CRITICAL DISCLAIMER */}
            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-6 mb-12">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mb-2">
                            DISCLAIMER IMPORTANTE: Non è consulenza legale
                        </h3>
                        <p className="text-amber-700 dark:text-amber-300/80 leading-relaxed text-sm">
                            GIURIMì è una piattaforma puramente educativa. I contenuti (lezioni, quiz, glossario) sono curati con diligenza ma potrebbero contenere imprecisioni, semplificazioni didattiche o non essere aggiornati alle ultime novità normative.
                            <br /><br />
                            <strong>L'utilizzo di GIURIMì non sostituisce in alcun modo il parere di un avvocato o di un professionista abilitato.</strong> Non prendere decisioni legali basandoti esclusivamente su ciò che leggi qui.
                        </p>
                    </div>
                </div>
            </Card>

            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-primary hover:prose-a:underline">
                <section className="mb-12">
                    <h2>1. Oggetto del servizio</h2>
                    <p>
                        GIURIMì offre contenuti educativi sul diritto italiano in modalità gamificata. Il servizio è fornito "così com'è" e "come disponibile", senza garanzie di continuità o assenza di errori.
                        Il team si riserva il diritto di modificare, sospendere o interrompere il servizio in qualsiasi momento.
                    </p>
                </section>

                <section className="mb-12">
                    <h2>2. Account e Registrazione</h2>
                    <p>
                        Per accedere ad alcune funzionalità (salvataggio progressi) è necessaria la registrazione.
                        Sei responsabile della custodia delle tue credenziali. Se ti registri come studente con email istituzionale, dichiari di essere l'effettivo titolare di tale indirizzo.
                    </p>
                </section>

                <section className="mb-12">
                    <h2>3. Proprietà Intellettuale</h2>
                    <p>
                        Tutti i contenuti originali (testi, struttura delle lezioni, codice sorgente) sono protetti da diritto d'autore.
                        GIURIMì è un progetto open source: il codice è distribuito secondo la licenza specificata nel repository GitHub (MIT).
                        I contenuti testuali sono distribuiti con licenza <strong>Creative Commons BY-NC-SA 4.0</strong> (Attribuzione - Non commerciale - Condividi allo stesso modo), salvo diversa indicazione.
                    </p>
                </section>

                <section className="mb-12">
                    <h2>4. Comportamento dell'utente</h2>
                    <p>
                        Ti impegni a non utilizzare il servizio per scopi illeciti o per danneggiare la piattaforma.
                        È vietato tentare di aggirare le misure di sicurezza, effettuare scraping massivo dei contenuti o utilizzare i form di contatto per spam.
                    </p>
                </section>

                <section className="mb-12">
                    <h2>5. Limitazione di Responsabilità</h2>
                    <p>
                        Nella misura massima consentita dalla legge, GIURIMì e i suoi collaboratori non saranno responsabili per danni diretti, indiretti, incidentali o consequenziali derivanti dall'uso o dall'impossibilità di usare il servizio, o dall'affidamento fatto sulle informazioni fornite.
                    </p>
                </section>

                <section className="mb-12">
                    <h2>6. Modifiche ai Termini</h2>
                    <p>
                        Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno efficaci dal momento della pubblicazione sul sito. L'uso continuato del servizio implica l'accettazione dei nuovi termini.
                    </p>
                </section>
            </article>

            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
                <p>Hai domande?</p>
                <Link href="/chi-siamo">
                    <Button variant="ghost">Contatta il team</Button>
                </Link>
            </div>
        </div>
    );
}
