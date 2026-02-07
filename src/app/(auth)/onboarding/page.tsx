"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { CheckCircle2 } from 'lucide-react';

const roles = [
    { id: 'student', label: 'Studente di Giurisprudenza', desc: 'Approfondisci le basi per i tuoi esami.' },
    { id: 'citizen', label: 'Cittadino', desc: 'Capire i propri diritti e doveri quotidiani.' },
    { id: 'high_school', label: 'Liceale', desc: 'Supporto per Educazione Civica.' },
    { id: 'professional', label: 'Professionista', desc: 'Nozioni legali per il tuo lavoro.' },
    { id: 'creator', label: 'Creator', desc: 'Informare la tua audience correttamente.' },
];

export default function OnboardingPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleComplete = async () => {
        if (!selectedRole) return;
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Update profile
        const { error } = await supabase
            .from('profiles')
            .update({
                role: selectedRole,
                onboarding_completed: true,
                // In real app we would generate preferred_path here
            })
            .eq('id', user.id);

        if (!error) {
            router.push('/dashboard');
        } else {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold mb-2">Benvenuto su GIURIMÌ</h1>
                    <p className="text-neutral-500">Personalizziamo il tuo percorso. Chi sei?</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all relative ${selectedRole === role.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-neutral-300 bg-white'}`}
                        >
                            {selectedRole === role.id && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />}
                            <h3 className="font-semibold mb-1">{role.label}</h3>
                            <p className="text-sm text-neutral-500">{role.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button size="lg" disabled={!selectedRole || loading} onClick={handleComplete}>
                        {loading ? 'Preparazione...' : 'Inizia il percorso'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
