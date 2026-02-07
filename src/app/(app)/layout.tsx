import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-50/50 dark:bg-neutral-950">
            <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <Navbar />
            <div className="relative z-10 flex flex-1 container mx-auto">
                <Sidebar />
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
