import { Metadata } from 'next';
import { LegalMap } from '@/components/map/LegalMap';
import { getCurriculum } from '@/lib/content/loader';

export const metadata: Metadata = {
    title: 'Mappa Interattiva dell\'Ordinamento | GIURIMÌ',
    description: 'Esplora la gerarchia delle fonti e la struttura dell\'ordinamento giuridico italiano in modo interattivo.',
};

export default async function InteractiveMapPage() {
    const curriculum = await getCurriculum();

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-7xl mx-auto space-y-4">
            <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white">
                    Mappa dell'Ordinamento
                </h1>
                <p className="text-neutral-500 text-lg">
                    Esplora la gerarchia delle fonti e come si collegano le varie aree del diritto.
                </p>
            </div>

            <div className="flex-1 min-h-[500px] w-full relative">
                <LegalMap curriculum={curriculum} />
            </div>
        </div>
    );
}
