import { getAllGlossaryTerms } from '@/lib/content/loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default async function GlossaryPage() {
    const terms = await getAllGlossaryTerms();
    // Sort terms alphabetically
    terms.sort((a: any, b: any) => a.term.localeCompare(b.term));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-8">Glossario Giuridico</h1>
            <p className="text-neutral-500 mb-8 max-w-2xl">
                Un dizionario semplice per navigare tra i termini legali più comuni.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {terms.map((term: any) => (
                    <Card key={term.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-primary">{term.term}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{term.definition_simple}</p>
                            {term.definition_technical && (
                                <p className="text-xs text-neutral-400 italic bg-neutral-50 dark:bg-neutral-900 p-2 rounded">
                                    Tecnico: {term.definition_technical}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
