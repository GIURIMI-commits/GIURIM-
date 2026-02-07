import { getCurriculum } from '@/lib/content/loader';
import { SidebarNav } from './SidebarNav';

export async function Sidebar() {
    // Fetch the full curriculum tree (Areas -> Modules -> Lessons)
    const curriculum = await getCurriculum();

    return (
        <aside className="w-64 border-r bg-neutral-50/50 hidden md:block h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
            <div className="p-4">
                <div className="font-semibold text-xs text-neutral-400 uppercase tracking-widest mb-4">
                    Indice Contenuti
                </div>

                <SidebarNav curriculum={curriculum} />
            </div>
        </aside>
    );
}
