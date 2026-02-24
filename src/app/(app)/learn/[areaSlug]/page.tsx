import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getModules, getLessons } from '@/lib/content/loader';
import { AreaProgress, ModuleProgress } from '@/components/layout/AreaProgress';

interface PageProps {
    params: {
        areaSlug: string;
    };
}

export default async function AreaPage({ params }: PageProps) {
    const { areaSlug } = await params;
    const modules = await getModules(areaSlug);

    // Fetch lessons for each module to find the first one
    const modulesWithLessons = await Promise.all(modules.map(async (mod) => {
        const lessons = await getLessons(areaSlug, mod.slug);
        return {
            ...mod,
            firstLessonSlug: lessons.length > 0 ? lessons[0].slug : null
        };
    }));
    return (
        <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold capitalize">{areaSlug.replace(/-/g, ' ')}</h1>

            <AreaProgress areaSlug={areaSlug} modulesWithLessons={modulesWithLessons} />

            <div className="grid gap-3 sm:gap-4">
                {modulesWithLessons.map(mod => {
                    return (
                        <Link
                            key={mod.slug}
                            href={mod.firstLessonSlug ? `/learn/${areaSlug}/${mod.slug}/${mod.firstLessonSlug}` : "#"}
                            className="block p-4 sm:p-5 md:p-6 border rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                        >
                            <h2 className="text-lg sm:text-xl font-bold mb-2">{mod.title}</h2>
                            <p className="text-neutral-500 mb-4">{mod.description}</p>
                            <span className="text-sm text-primary font-medium">
                                {mod.firstLessonSlug ? "Apri Modulo →" : "Prossimamente"}
                            </span>

                            <ModuleProgress
                                moduleData={mod}
                                curriculum={[{ slug: areaSlug, title: "", modules: modulesWithLessons }]}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
