"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROOMS } from "@/lib/corte/data";
import { Gavel, Landmark, Users, Globe, Cpu, Coffee, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Map string icons to components
const IconMap: any = {
    gavel: Gavel,
    landmark: Landmark,
    users: Users,
    globe: Globe,
    cpu: Cpu,
    coffee: Coffee,
};

export function RoomSidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4 px-2">
                    Aule di Giustizia
                </h3>
                <nav className="space-y-1">
                    <Link
                        href="/corte"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            pathname === "/corte"
                                ? "bg-sidebar-accent text-sidebar-foreground font-semibold"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                    >
                        <MessageSquare className="h-4 w-4 opacity-70" />
                        Tutte le discussioni
                    </Link>

                    {ROOMS.map((room) => {
                        const Icon = IconMap[room.icon] || Gavel;
                        const isActive = pathname === `/corte/aula/${room.slug}`;

                        return (
                            <Link
                                key={room.id}
                                href={`/corte/aula/${room.slug}`}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                    isActive
                                        ? "bg-sidebar-accent text-sidebar-foreground font-semibold"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4 opacity-70" />
                                {room.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
