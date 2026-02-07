"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Room } from "@/lib/corte/types";
import { Gavel, Landmark, Users, Globe, Cpu, Coffee, MessageSquare, BookOpen, FileText, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Map string icons
const IconMap: any = {
    gavel: Gavel,
    landmark: Landmark,
    users: Users,
    globe: Globe,
    cpu: Cpu,
    coffee: Coffee,
    "book-open": BookOpen,
    "file-text": FileText,
};

interface RoomSidebarProps {
    rooms: Room[];
}

export function RoomSidebar({ rooms }: RoomSidebarProps) {
    const pathname = usePathname();

    // Group rooms by category
    const categories = [
        { id: "materie", title: "MATERIE" },
        { id: "studio", title: "STUDIO & ESAMI" },
        { id: "community", title: "COMMUNITY" }
    ];

    // State for collapsible sections
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        materie: true,
        studio: true,
        community: true
    });

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-2 py-2">

            {/* Feed Link (Top Level) */}
            <Link
                href="/corte"
                className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-6",
                    pathname === "/corte"
                        ? "bg-secondary/50 text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
            >
                <div className="p-1 rounded bg-indigo-500/10 text-indigo-500">
                    <MessageSquare className="h-4 w-4" />
                </div>
                Feed Principale
            </Link>

            {/* Categories */}
            {categories.map((cat) => {
                const categoryRooms = rooms.filter(r => r.category === cat.id);
                if (categoryRooms.length === 0) return null;

                return (
                    <div key={cat.id} className="pb-4">
                        <button
                            onClick={() => toggleSection(cat.id)}
                            className="flex items-center justify-between w-full px-2 py-1 mb-1 group"
                        >
                            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-bold group-hover:text-muted-foreground transition-colors">
                                {cat.title}
                            </h3>
                            {openSections[cat.id] ?
                                <ChevronDown className="h-3 w-3 text-muted-foreground/50" /> :
                                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                            }
                        </button>

                        {openSections[cat.id] && (
                            <nav className="space-y-0.5">
                                {categoryRooms.map(room => {
                                    const Icon = IconMap[room.icon] || Gavel;
                                    const isActive = pathname === `/corte/aula/${room.slug}`;

                                    return (
                                        <Link
                                            key={room.id}
                                            href={`/corte/aula/${room.slug}`}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all group",
                                                isActive
                                                    ? "bg-accent text-accent-foreground font-medium"
                                                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                                            )}
                                        >
                                            <Icon className={cn("h-4 w-4 opacity-70 group-hover:opacity-100", isActive && "opacity-100 text-amber-500")} />
                                            <span>{room.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
