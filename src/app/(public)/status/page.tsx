export default function StatusPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-6">Stato del Progetto</h1>

            <div className="space-y-8">
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <h2 className="text-xl font-bold font-serif m-0">Beta Pubblica (v0.1.0)</h2>
                    </div>
                    <p className="text-muted-foreground">
                        GIURIMì è attualmente in fase di "Public Beta". Questo significa che la piattaforma è funzionante e aperta a tutti,
                        ma stiamo ancora lavorando attivamente per migliorare le funzionalità e aggiungere nuovi contenuti.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-border bg-card">
                        <h3 className="font-bold mb-4 flex items-center gap-2">✅ Operativo</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Autenticazione Studenti</li>
                            <li>• Lezioni Interattive</li>
                            <li>• Sistema Quiz e Ripetizione</li>
                            <li>• Forum "La Corte" (Base)</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-border bg-card opacity-70">
                        <h3 className="font-bold mb-4 flex items-center gap-2">🚧 In Arrivo</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• App Mobile Nativa</li>
                            <li>• Simulazioni d'Esame Avanzate</li>
                            <li>• Community Mentorship</li>
                            <li>• Espansione Moduli (Amministrativo, Commerciale)</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-border">
                    <p className="text-muted-foreground">
                        Hai trovato un bug o hai suggerimenti?
                        <a href="mailto:support@giurimi.it" className="text-primary hover:underline ml-1">Contattaci</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
