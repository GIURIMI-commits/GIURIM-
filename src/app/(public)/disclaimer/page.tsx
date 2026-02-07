export default function DisclaimerPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-6">Disclaimer Legale</h1>

            <div className="prose prose-neutral dark:prose-invert">
                <p className="lead text-xl text-muted-foreground mb-8">
                    GIURIMì è una piattaforma a scopo esclusivamente <strong>educativo e divulgativo</strong>.
                </p>

                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-6 rounded-xl mb-8">
                    <h3 className="text-amber-800 dark:text-amber-200 font-bold text-lg mb-2">Non è consulenza legale</h3>
                    <p className="text-amber-700 dark:text-amber-300/80 m-0">
                        Le informazioni fornite su questo sito non costituiscono consulenza legale e non devono essere intese come tali.
                        Non si instaura alcun rapporto avvocato-cliente attraverso l'uso di questo sito.
                    </p>
                </div>

                <h3>Accuratezza delle informazioni</h3>
                <p>
                    Sebbene ci impegniamo a mantenere le informazioni aggiornate e corrette, il diritto è una materia complessa e in costante evoluzione.
                    Non garantiamo che tutte le informazioni siano esenti da errori o perfettamente aggiornate rispetto alle ultimissime novità legislative.
                </p>

                <h3>Uso professionale</h3>
                <p>
                    Se hai un problema legale specifico, ti invitiamo a consultare un avvocato o un professionista qualificato.
                    Non fare affidamento esclusivamente sulle informazioni trovate su questo sito per prendere decisioni importanti.
                </p>
            </div>
        </div>
    );
}
