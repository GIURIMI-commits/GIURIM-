import { redirect } from 'next/navigation';
import { getModules } from '@/lib/content/loader';

interface PageProps {
    params: {
        areaSlug: string;
    };
}

export default async function AreaPage({ params }: PageProps) {
    const { areaSlug } = await params;
    const modules = await getModules(areaSlug);

    // If there are modules, redirect to the first lesson of the first module
    // OR show a list of modules.
    // Ideally show list of modules.

    // For scaffold, let's just list modules with links to their first lesson?
    // Or simply link to the module page? We don't have a module page yet. 
    // Let's redirect to the first lesson of the first module for now to prove navigation works,
    // OR create a simple module list page.

    // Let's create a simple module list page.
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold capitalize">{areaSlug.replace(/-/g, ' ')}</h1>
            <div className="grid gap-4">
                {modules.map(mod => (
                    <div key={mod.slug} className="p-6 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                        <h2 className="text-xl font-bold mb-2">{mod.title}</h2>
                        <p className="text-neutral-500 mb-4">{mod.description}</p>
                        {/* We'd need to find the first lesson of this module to link to it properly */}
                        {/* For now, constructing a likely path or placeholder */}
                        <span className="text-sm text-primary font-medium">Apri Modulo →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
