import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna alla Home
            </Link>

            <header className="mb-12 border-b border-border pb-8">
                <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="h-8 w-8 text-foreground" />
                    <h1 className="text-4xl font-serif font-bold text-foreground">Privacy Policy</h1>
                </div>
                <p className="text-muted-foreground">
                    Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </header>

            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-primary hover:prose-a:underline">
                <section className="mb-12">
                    <h2>1. Chi siamo e perché questa policy</h2>
                    <p>
                        In questa pagina si descrivono le modalità di gestione del sito in riferimento al trattamento dei dati personali degli utenti che lo consultano.
                        Si tratta di un'informativa resa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) a coloro che interagiscono con i servizi web di <strong>GIURIMì</strong>.
                    </p>
                    <p>
                        Il Titolare del trattamento è il team di sviluppo di GIURIMì (progetto open source), contattabile all'indirizzo email <a href="mailto:privacy@giurimi.it">privacy@giurimi.it</a> (placeholder).
                    </p>
                </section>

                <section className="mb-12">
                    <h2>2. Quali dati raccogliamo</h2>
                    <p>
                        A seconda di come interagisci con il sito, possiamo raccogliere i seguenti dati:
                    </p>
                    <ul>
                        <li><strong>Dati di navigazione:</strong> I sistemi informatici acquisiscono, nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell'uso dei protocolli di comunicazione di Internet (es. indirizzi IP).</li>
                        <li><strong>Dati forniti volontariamente:</strong> Quando ti registri, raccogliamo il tuo indirizzo email e, opzionalmente, il tuo nome o nickname. Se sei uno studente, potremmo verificare il dominio della tua email istituzionale.</li>
                        <li><strong>Dati di utilizzo:</strong> Tracciamo i tuoi progressi nelle lezioni, i quiz completati e le aree visitate per offrirti l'esperienza gamificata (dashboard, streak, badge).</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2>3. Finalità del trattamento</h2>
                    <p>I dati sono trattati per le seguenti finalità:</p>
                    <ol>
                        <li><strong>Erogazione del servizio:</strong> Permetterti di accedere alle lezioni, salvare i progressi e visualizzare la dashboard.</li>
                        <li><strong>Miglioramento:</strong> Analizzare in forma aggregata come viene usato il sito per migliorare i contenuti.</li>
                        <li><strong>Sicurezza:</strong> Prevenire abusi o utilizzi fraudolenti.</li>
                    </ol>
                </section>

                <section className="mb-12">
                    <h2>4. Cookie e tracciamento</h2>
                    <p>
                        Utilizziamo cookie tecnici (essenziali) e, previo tuo consenso, cookie analitici.
                        Puoi gestire le tue preferenze in qualsiasi momento tramite il pannello dedicato.
                    </p>
                    <div className="mt-4">
                        <Link href="/privacy/cookie-preferences">
                            <Button variant="outline">Gestisci preferenze cookie</Button>
                        </Link>
                    </div>
                </section>

                <section className="mb-12">
                    <h2>5. I tuoi diritti</h2>
                    <p>
                        Ai sensi del GDPR, hai diritto di:
                    </p>
                    <ul>
                        <li>Chiedere l'accesso ai tuoi dati personali.</li>
                        <li>Chiedere la rettifica o la cancellazione degli stessi ("diritto all'oblio").</li>
                        <li>Limitare il trattamento o opporti ad esso.</li>
                        <li>Richiedere la portabilità dei dati.</li>
                    </ul>
                    <p>
                        Per esercitare questi diritti, puoi contattarci o utilizzare le funzioni di gestione account nella tua <Link href="/profilo">area riservata</Link>.
                    </p>
                </section>
            </article>
        </div>
    );
}
