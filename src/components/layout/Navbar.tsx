"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';

export function Navbar() {
    const { profile, loading } = useProfile();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

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
                                    <Link href="/learn" className="hidden md:block">
                                        <Button variant="ghost" className="font-medium">Lezioni</Button>
                                    </Link>
                                    <Link href="/dashboard" className="hidden md:block">
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
                                    <Link href="/login" className="hidden md:block">
                                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Accedi</Button>
                                    </Link>
                                    <Link href="/registrazione">
                                        <Button className="rounded-full px-4 md:px-6 text-sm">Inizia</Button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    <Link
                        href="/chi-siamo"
                        className="p-2 hover:bg-muted rounded-md transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Chi siamo
                    </Link>
                    <Link
                        href="/glossario"
                        className="p-2 hover:bg-muted rounded-md transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Glossario
                    </Link>
                    <Link
                        href="/studenti"
                        className="p-2 hover:bg-muted rounded-md transition-colors font-medium text-indigo-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Studenti
                    </Link>
                    <Link
                        href="/corte"
                        className="p-2 hover:bg-muted rounded-md transition-colors font-medium text-[#C4A052]"
                        onClick={() => setIsOpen(false)}
                    >
                        CORTE (Community)
                    </Link>

                    <div className="h-px bg-border my-1" />

                    {!profile && (
                        <Link
                            href="/login"
                            className="p-2 hover:bg-muted rounded-md transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Accedi
                        </Link>
                    )}

                    {profile && (
                        <>
                            <Link
                                href="/learn"
                                className="p-2 hover:bg-muted rounded-md transition-colors font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Lezioni
                            </Link>
                            <Link
                                href="/dashboard"
                                className="p-2 hover:bg-muted rounded-md transition-colors font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

