import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">GUIRIMÌ</h3>
                        <p className="text-sm text-neutral-500">
                            Diritto semplice, per tutti.
                            <br />
                            Una piattaforma educativa open source.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Esplora</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><Link href="/learn" className="hover:underline">Lezioni</Link></li>
                            <li><Link href="/glossario" className="hover:underline">Glossario</Link></li>
                            <li><Link href="/chi-siamo" className="hover:underline">Chi siamo</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legale</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link href="/privacy/cookie-preferences" className="hover:underline">Preferenze Cookie</Link></li>
                            <li><Link href="/terms" className="hover:underline">Termini di Servizio</Link></li>
                            <li><span className="text-neutral-400">Licenza MIT</span></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-xs text-neutral-400">
                    <p>&copy; {new Date().getFullYear()} GUIRIMÌ. Non è consulenza legale.</p>
                </div>
            </div>
        </footer>
    );
}
