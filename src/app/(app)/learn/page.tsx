import { getAreas } from '@/lib/content/loader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function LearnIndexPage() {
    const areas = await getAreas();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let hasFullAccess = false;
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('student_status, subscription_tier')
            .eq('id', user.id)
            .single();

        hasFullAccess = profile?.student_status === 'verified' || profile?.subscription_tier === 'pro';
    }

    return (
        <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
            <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">Il Curriculum di GIURIMÌ</h1>
                <p className="text-neutral-500 text-base sm:text-lg">
                    Un percorso strutturato per capire il diritto italiano, dalle basi alla pratica.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {areas.map((area) => {
                    const isLocked = area.order > 2 && !hasFullAccess;

                    const cardContent = (
                        <Card className={`h-full border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-all ${isLocked ? 'opacity-70 saturate-50' : 'hover:shadow-md cursor-pointer'}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Area {area.order}</span>
                                    {isLocked && <Lock className="h-4 w-4 text-neutral-400" />}
                                </div>
                                <CardTitle className={`${isLocked ? 'text-neutral-500' : 'group-hover:text-primary transition-colors'}`}>
                                    {area.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-500 mb-4 text-sm line-clamp-2">{area.description}</p>
                                {isLocked ? (
                                    <div className="flex items-center justify-between text-sm font-medium text-amber-500 border border-amber-500/20 bg-amber-500/5 rounded-lg p-2 px-3 mt-4">
                                        <span>Pro o Studenti</span>
                                        <Lock className="h-3.5 w-3.5 ml-2" />
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm font-medium text-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity transform md:translate-y-2 md:group-hover:translate-y-0 mt-4">
                                        Esplora Area <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );

                    if (isLocked) {
                        return (
                            <Link key={area.slug} href="/profilo" className="block h-full cursor-pointer">
                                {cardContent}
                            </Link>
                        );
                    }

                    return (
                        <Link key={area.slug} href={`/learn/${area.slug}`} className="block h-full group">
                            {cardContent}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
