"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Menu, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';
import { GlobalSearch } from '@/components/ui/search/GlobalSearch';

export function Navbar() {
    const { profile, loading } = useProfile();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

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

                        {/* Esplora Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-foreground transition-colors font-medium">
                                Esplora <ChevronDown className="h-4 w-4 opacity-70" />
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all origin-top-left z-50">
                                <Link href="/learn" className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                                    Lezioni
                                </Link>
                                <Link href="/glossario" className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                                    Glossario
                                </Link>
                                <Link href="/mappa" className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                                    Mappa Ordinamento
                                </Link>
                                <Link href="/studenti" className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-indigo-600 dark:text-indigo-400 font-medium">
                                    Studenti
                                </Link>
                                <Link href="/risorse" className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                                    Letture e Risorse
                                </Link>
                            </div>
                        </div>

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
                    {/* Search Trigger */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted border border-border/50 rounded-full transition-colors"
                    >
                        <Search className="h-4 w-4" />
                        <span>Cerca...</span>
                        <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>
                    {/* Mobile Search Icon */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        {!loading && (
                            <>
                                {profile ? (
                                    <div className="flex items-center gap-4">
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
                                    </div>
                                )}
                            </>
                        )}
                    </div>
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
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                        Esplora
                    </div>
                    <Link
                        href="/learn"
                        className="p-2 ml-2 hover:bg-muted rounded-md transition-colors font-medium text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        Lezioni
                    </Link>
                    <Link
                        href="/glossario"
                        className="p-2 ml-2 hover:bg-muted rounded-md transition-colors font-medium text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        Glossario
                    </Link>
                    <Link
                        href="/mappa"
                        className="p-2 ml-2 hover:bg-muted rounded-md transition-colors font-medium text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        Mappa Ordinamento
                    </Link>
                    <Link
                        href="/studenti"
                        className="p-2 ml-2 hover:bg-muted rounded-md transition-colors font-medium text-sm text-indigo-600 dark:text-indigo-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Studenti
                    </Link>
                    <Link
                        href="/risorse"
                        className="p-2 ml-2 hover:bg-muted rounded-md transition-colors font-medium text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        Letture e Risorse
                    </Link>

                    <div className="h-px bg-border my-1" />
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

            <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </nav>
    );
}

