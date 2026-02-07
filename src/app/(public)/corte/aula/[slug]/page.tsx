import { RoomSidebar } from "@/components/corte/RoomSidebar";
import { CourtNotice } from "@/components/corte/CourtNotice";
import { ThreadCard } from "@/components/corte/ThreadCard";
import { Search, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getRooms, getThreads } from "@/lib/corte/data";
import { notFound } from "next/navigation";

interface RoomPageProps {
    params: Promise<{ slug: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
    const { slug } = await params;

    // Fetch data
    const rooms = await getRooms();
    const threads = await getThreads(slug);

    // Find current room info
    const currentRoom = rooms.find(r => r.slug === slug);

    if (!currentRoom) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Mobile Header */}
            <div className="md:hidden mb-6">
                <Link href="/corte" className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <ArrowLeft className="h-4 w-4" /> Torna al feed
                </Link>
                <h1 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
                    {currentRoom.name}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* LEFT: Sidebar */}
                <aside className="hidden md:block md:col-span-1 border-r border-border/50 pr-4 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
                    <RoomSidebar rooms={rooms} />
                </aside>

                {/* CENTER: Feed */}
                <main className="md:col-span-2 lg:col-span-3 min-h-[50vh]">

                    {/* Room Header (Desktop) */}
                    <div className="hidden md:flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-foreground">{currentRoom.name}</h1>
                            <p className="text-muted-foreground mt-1">{currentRoom.description}</p>
                        </div>
                        <Link href={`/corte/nuovo?room=${currentRoom.id}`}>
                            <Button className="h-10 rounded-full px-6 gap-2 bg-[#C4A052] hover:bg-[#B08D46] text-white">
                                <Plus className="h-4 w-4" /> Crea in Aula
                            </Button>
                        </Link>
                    </div>

                    {/* Feed List */}
                    <div className="space-y-4">
                        {threads.length > 0 ? (
                            threads.map((thread) => (
                                <ThreadCard key={thread.id} thread={thread} />
                            ))
                        ) : (
                            <div className="py-12 text-center rounded-xl border border-dashed border-border/50 bg-card/50">
                                <p className="text-muted-foreground font-medium">Questa aula è vuota.</p>
                                <p className="text-xs text-muted-foreground/70 mt-1">Sii il primo a intervenire!</p>
                                <Link href={`/corte/nuovo?room=${currentRoom.id}`} className="inline-block mt-4">
                                    <Button variant="outline" className="gap-2">
                                        <Plus className="h-4 w-4" /> Nuova Discussione
                                    </Button>
                                </Link>
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
            <Link href={`/corte/nuovo?room=${currentRoom.id}`} className="md:hidden fixed bottom-6 right-6 z-50 shadow-lg shadow-primary/20">
                <div className="h-14 w-14 rounded-full bg-[#C4A052] text-white flex items-center justify-center">
                    <Plus className="h-7 w-7" />
                </div>
            </Link>
        </div>
    );
}
