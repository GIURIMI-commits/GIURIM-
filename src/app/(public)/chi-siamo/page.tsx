import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-8">Chi siamo</h1>

            <div className="prose prose-lg prose-neutral dark:prose-invert">
                <p>
                    GUIRIMì nasce con una missione semplice ma ambiziosa: rendere il diritto italiano accessibile a tutti.
                </p>
                <p>
                    Crediamo che la conoscenza delle regole che governano la nostra società non debba essere un privilegio di pochi esperti, ma uno strumento nelle mani di ogni cittadino.
                </p>
                <p>
                    Siamo una community open source di giuristi, sviluppatori e cittadini appassionati che lavorano insieme per tradurre la complessità legale in contenuti chiari, verificati e gratuiti.
                </p>
            </div>

            <div className="mt-12 bg-neutral-100 dark:bg-neutral-900 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold mb-4">Vuoi contribuire?</h2>
                <p className="text-neutral-600 mb-6">
                    Sei un avvocato, uno studente di legge o uno sviluppatore? Aiutaci a far crescere GUIRIMì.
                </p>
                <a href="https://github.com/alessiosabatino/guirimi" target="_blank" rel="noopener noreferrer">
                    <Button>Vai al repository GitHub</Button>
                </a>
            </div>
        </div>
    );
}
