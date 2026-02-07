"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';
import { Scale } from 'lucide-react';

import { usePathname } from 'next/navigation';

export function Navbar() {
    const { profile, loading } = useProfile();
    const pathname = usePathname();

    return (
        <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight">
                        <Scale className="h-6 w-6" />
                        <span>GUIRIMÌ</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/chi-siamo" className="hover:text-foreground transition-colors">
                            Chi siamo
                        </Link>
                        <Link href="/glossario" className="hover:text-foreground transition-colors">
                            Glossario
                        </Link>
                        <Link href="/studenti" className="hover:text-foreground transition-colors text-indigo-600 font-semibold dark:text-indigo-400">
                            Studenti
                        </Link>

                        {/* Community Divider */}
                        <div className="h-4 w-px bg-border/60 mx-1" />

                        {/* CORTE Link - Subtle Judicial Gold Accent */}
                        <Link
                            href="/corte"
                            className={`
                                flex items-center gap-2 px-3 py-1.5 rounded-md transition-all
                                ${pathname?.startsWith('/corte')
                                    ? "bg-[#C4A052]/10 text-[#C4A052] font-semibold"
                                    : "hover:bg-[#C4A052]/5 hover:text-[#C4A052]/80 text-muted-foreground"}
                            `}
                        >
                            <span className="text-xs uppercase tracking-wider font-serif">CORTE</span>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {!loading && (
                        <>
                            {profile ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/learn">
                                        <Button variant="ghost" className="font-medium">Lezioni</Button>
                                    </Link>
                                    <Link href="/dashboard">
                                        <Button variant="ghost" className="font-medium text-muted-foreground">Dashboard</Button>
                                    </Link>
                                    <Link href="/profilo">
                                        <div className="h-8 w-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-700">
                                            {profile.display_name ? profile.display_name[0].toUpperCase() : 'U'}
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login">
                                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Accedi</Button>
                                    </Link>
                                    <Link href="/registrazione">
                                        <Button className="rounded-full px-6">Inizia</Button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

