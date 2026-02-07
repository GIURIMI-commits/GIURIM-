import { RoomSidebar } from "@/components/corte/RoomSidebar";
import { CourtNotice } from "@/components/corte/CourtNotice";
import { ThreadCard } from "@/components/corte/ThreadCard";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getRooms, getThreads } from "@/lib/corte/data";

export default async function CortePage() {
    // Fetch real data
    const rooms = await getRooms();
    const threads = await getThreads();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden mb-6">
                <h1 className="text-2xl font-serif font-bold text-foreground">CORTE</h1>
                <p className="text-sm text-muted-foreground">Il forum degli studenti di GIURIMì</p>
                <Link href="/corte/nuovo" className="block mt-4">
                    <Button className="w-full rounded-full gap-2">
                        <Plus className="h-4 w-4" /> Nuova Discussione
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* LEFT: Sidebar (Hidden on mobile, future: drawer) */}
                <aside className="hidden md:block md:col-span-1 border-r border-border/50 pr-4 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
                    <RoomSidebar rooms={rooms} />
                </aside>

                {/* CENTER: Feed */}
                <main className="md:col-span-2 lg:col-span-3 min-h-[50vh]">
                    {/* Search Bar + Desktop CTA */}
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cerca discussioni, sentenze, argomenti..."
                                className="w-full h-11 pl-10 pr-4 rounded-full border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/70"
                            />
                        </div>
                        <Link href="/corte/nuovo" className="hidden md:block">
                            <Button className="h-11 rounded-full px-6 gap-2 bg-[#C4A052] hover:bg-[#B08D46] text-white">
                                <Plus className="h-4 w-4" /> Nuova Discussione
                            </Button>
                        </Link>
                    </div>

                    {/* Filters (Mock) */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold whitespace-nowrap">
                            Più recenti
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-muted/40 text-muted-foreground hover:bg-muted text-sm font-medium whitespace-nowrap transition-colors">
                            Popolari
                        </button>
                    </div>

                    {/* Feed List */}
                    <div className="space-y-4">
                        {threads.length > 0 ? (
                            threads.map((thread) => (
                                <ThreadCard key={thread.id} thread={thread} />
                            ))
                        ) : (
                            <div className="py-12 text-center rounded-xl border border-dashed border-border/50">
                                <p className="text-muted-foreground font-medium">Nessuna discussione trovata.</p>
                                <p className="text-xs text-muted-foreground/70 mt-1">Sii il primo a rompere il ghiaccio!</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* RIGHT: Notices */}
                <aside className="hidden lg:block lg:col-span-1 pl-4 sticky top-24 h-fit">
                    <CourtNotice />
                </aside>
            </div>

            {/* FAB Mobile */}
            <Link href="/corte/nuovo" className="md:hidden fixed bottom-6 right-6 z-50 shadow-lg shadow-primary/20">
                <div className="h-14 w-14 rounded-full bg-[#C4A052] text-white flex items-center justify-center">
                    <Plus className="h-7 w-7" />
                </div>
            </Link>
        </div>
    );
}
