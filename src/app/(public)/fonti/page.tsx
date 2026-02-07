export default function FontiPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-6">Trasparenza delle Fonti</h1>

            <div className="prose prose-neutral dark:prose-invert">
                <p className="lead text-xl text-muted-foreground mb-8">
                    GIURIMì si basa su fonti ufficiali e verificate per garantire un'educazione giuridica di alta qualità.
                </p>

                <h3>Fonti Primarie</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Gazzetta Ufficiale della Repubblica Italiana</strong> (www.gazzettaufficiale.it)</li>
                    <li><strong>Costituzione Italiana</strong> (testo vigente)</li>
                    <li><strong>Codici</strong> (Codice Civile, Penale, di Procedura) aggiornati</li>
                    <li><strong>Normattiva</strong> (www.normattiva.it)</li>
                </ul>

                <h3 className="mt-8">Fonti Secondarie</h3>
                <p>
                    Per la spiegazione dei concetti ci avvaliamo della migliore dottrina manualistica universitaria italiana (es. Manuali di Diritto Privato, Pubblico, Costituzionale) e della giurisprudenza consolidata della Corte di Cassazione.
                </p>

                <h3 className="mt-8">Metodo di Verifica</h3>
                <p>
                    Ogni lezione viene redatta partendo dal testo di legge e verificata con la dottrina prevalente.
                    Segnaliamo sempre l'articolo di riferimento per permettere allo studente di verificare autonomamente la fonte.
                </p>
            </div>
        </div>
    );
}
