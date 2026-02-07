import Link from 'next/link';
import { getAreas } from '@/lib/content/loader';
import { cn } from '@/lib/utils';
import { Scale, Landmark, Users, Gavel, Building, Scale as Balance } from 'lucide-react'; // Mapping icons manually for now

const iconMap: { [key: string]: any } = {
    scale: Scale,
    landmark: Landmark,
    users: Users,
    gavel: Gavel,
    building: Building,
    balance: Balance,
};

export async function Sidebar() {
    const areas = await getAreas();

    return (
        <aside className="w-64 border-r bg-neutral-50/50 hidden md:block h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
            <div className="p-4 space-y-4">
                <div className="font-semibold text-sm text-neutral-500 uppercase tracking-wider">
                    Curriculum
                </div>

                <nav className="space-y-1">
                    {areas.map((area) => {
                        const Icon = iconMap[area.icon || 'scale'] || Scale;
                        return (
                            <div key={area.slug} className="space-y-1">
                                <Link
                                    href={`/learn/${area.slug}`}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-neutral-100 transition-colors text-neutral-900"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {area.title}
                                </Link>

                                {/* We could render modules here if we want a nested sidebar, 
                    but simpler for now to just link to area */}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
