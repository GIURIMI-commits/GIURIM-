"use client";

import { useConsent, DEFAULT_CONSENT } from "@/lib/consent";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Shield, BarChart3, Megaphone, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CookiePreferencesPage() {
    const { consent, updateConsent } = useConsent();
    const [preferences, setPreferences] = useState(DEFAULT_CONSENT);
    const [isSaved, setIsSaved] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setPreferences(consent);
    }, [consent]);

    const handleSave = () => {
        updateConsent(preferences);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        router.push('/'); // Optional: redirect back to home or stay
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-3xl font-serif font-bold mb-4">Preferenze Cookie</h1>
            <p className="text-muted-foreground mb-8">
                Gestisci il consenso per le tecnologie di tracciamento che utilizziamo.
            </p>

            <div className="space-y-6">
                {/* ESSENTIAL */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Essenziali</CardTitle>
                                    <CardDescription>Necessari per il funzionamento del sito</CardDescription>
                                </div>
                            </div>
                            <Switch checked={true} disabled />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Questi cookie sono indispensabili per navigare nel sito e utilizzare le sue funzionalità,
                            come l'accesso alle aree protette. Non possono essere disabilitati.
                        </p>
                    </CardContent>
                </Card>

                {/* ANALYTICS */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 text-blue-600 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Statistiche (Analytics)</CardTitle>
                                    <CardDescription>Per capire come usi il sito</CardDescription>
                                </div>
                            </div>
                            <Switch
                                checked={preferences.analytics}
                                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Ci aiutano a capire come gli utenti interagiscono con il sito raccogliendo e segnalando
                            informazioni in modo anonimo.
                        </p>
                    </CardContent>
                </Card>

                {/* MARKETING */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 text-purple-600 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                    <Megaphone className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Marketing</CardTitle>
                                    <CardDescription>Per offrirti contenuti personalizzati</CardDescription>
                                </div>
                            </div>
                            <Switch
                                checked={preferences.marketing}
                                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Utilizzati per tracciare i visitatori attraverso i siti web. L'intenzione è quella di
                            visualizzare annunci pertinenti e coinvolgenti per il singolo utente (al momento non usiamo pubblicità, ma potremmo usare pixel sociali).
                        </p>
                    </CardContent>
                </Card>

                <div className="pt-6">
                    <Button onClick={handleSave} className="w-full md:w-auto rounded-full px-8" size="lg">
                        {isSaved ? "Preferenze Salvate!" : "Salva Preferenze"}
                        {!isSaved && <Save className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Minimal Switch Component (if not already existing in component library)
// If you have a ui/Switch.tsx, use that. Otherwise, this is a local fallback or needs to be created.
// Assuming user might check if Switch exists.
