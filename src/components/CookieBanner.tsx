"use client";

import { useState, useEffect } from 'react';
import { useConsent } from '@/lib/consent';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
    const { hasConsented, acceptAll, rejectAll } = useConsent();
    const [isVisible, setIsVisible] = useState(false);

    // Only show after mount to avoid hydration mismatch and check if already consented
    useEffect(() => {
        if (!hasConsented) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [hasConsented]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 inset-x-4 z-50 md:max-w-xl md:left-auto md:right-4 animate-in slide-in-from-bottom-5 duration-500">
            <Card className="p-6 border-border shadow-2xl bg-card/95 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-primary">
                        <ShieldCheck className="h-5 w-5" />
                        <h3 className="font-serif font-bold text-lg">La tua privacy</h3>
                    </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Usiamo cookie per migliorare l'esperienza e analizzare l'uso del sito.
                    Puoi accettare tutto, rifiutare (solo essenziali) o gestire le preferenze.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button onClick={acceptAll} className="flex-1 rounded-full font-bold">
                        Accetta tutto
                    </Button>
                    <Button onClick={rejectAll} variant="outline" className="flex-1 rounded-full">
                        Solo essenziali
                    </Button>
                    <Link href="/privacy/cookie-preferences" className="flex-1">
                        <Button variant="ghost" className="w-full rounded-full text-muted-foreground hover:text-foreground">
                            Personalizza
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
