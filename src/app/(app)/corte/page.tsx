
import { RoomSidebar } from "@/components/corte/RoomSidebar";
import { CourtNotice } from "@/components/corte/CourtNotice";
import { ThreadCard } from "@/components/corte/ThreadCard";
import { MOCK_THREADS } from "@/lib/corte/data";
import { Search } from "lucide-react";

export default function CortePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden mb-6">
                <h1 className="text-2xl font-serif font-bold text-foreground">CORTE</h1>
                <p className="text-sm text-muted-foreground">Il forum degli studenti di GIURIMì</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* LEFT: Sidebar (Hidden on mobile, future: drawer) */}
                <aside className="hidden md:block md:col-span-1 border-r border-border/50 pr-4 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
                    <RoomSidebar />
                </aside>

                {/* CENTER: Feed */}
                <main className="md:col-span-2 lg:col-span-3 min-h-[50vh]">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cerca discussioni, sentenze, argomenti..."
                            className="w-full h-11 pl-10 pr-4 rounded-full border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/70"
                        />
                    </div>

                    {/* Filters (Mock) */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-medium whitespace-nowrap">
                            Più recenti
                        </button>
                        <button className="px-3 py-1.5 rounded-full bg-muted/40 text-muted-foreground hover:bg-muted text-xs font-medium whitespace-nowrap transition-colors">
                            Popolari
                        </button>
                        <button className="px-3 py-1.5 rounded-full bg-muted/40 text-muted-foreground hover:bg-muted text-xs font-medium whitespace-nowrap transition-colors">
                            Senza risposta
                        </button>
                    </div>

                    {/* Feed List */}
                    <div className="space-y-4">
                        {MOCK_THREADS.map((thread) => (
                            <ThreadCard key={thread.id} thread={thread} />
                        ))}
                    </div>

                    {/* Load More (Mock) */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-muted-foreground">Non ci sono altre discussioni recenti.</p>
                    </div>
                </main>

                {/* RIGHT: Notices */}
                <aside className="hidden lg:block lg:col-span-1 pl-4 sticky top-24 h-fit">
                    <CourtNotice />
                </aside>
            </div>
        </div>
    );
}
