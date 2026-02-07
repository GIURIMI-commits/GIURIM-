"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';
import { Scale } from 'lucide-react';

export function Navbar() {
    const { profile, loading } = useProfile();

    return (
        <nav className="border-b bg-background sticky top-0 z-40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold">
                        <Scale className="h-6 w-6" />
                        <span>GUIRIMÌ</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {!loading && (
                        <>
                            {profile ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/dashboard">
                                        <Button variant="ghost">Dashboard</Button>
                                    </Link>
                                    <Link href="/profilo">
                                        <Button variant="ghost" size="sm">{profile.display_name || 'Profilo'}</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login">
                                        <Button variant="ghost">Accedi</Button>
                                    </Link>
                                    <Link href="/registrazione">
                                        <Button>Inizia</Button>
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
