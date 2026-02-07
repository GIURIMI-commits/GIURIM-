import { getAreas } from '@/lib/content/loader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function LearnIndexPage() {
    const areas = await getAreas();

    return (
        <div className="space-y-8">
            <div className="max-w-2xl">
                <h1 className="text-3xl font-serif font-bold mb-4">Il Curriculum di GIURIMÌ</h1>
                <p className="text-neutral-500 text-lg">
                    Un percorso strutturato per capire il diritto italiano, dalle basi alla pratica.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areas.map((area) => (
                    <Link key={area.slug} href={`/learn/${area.slug}`} className="block h-full group">
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-neutral-200 dark:border-neutral-800">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Area {area.order}</span>
                                    {/* Icon placeholder could go here */}
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors">{area.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-500 mb-4 text-sm">{area.description}</p>
                                <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Esplora Area <ArrowRight className="ml-1 h-4 w-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
