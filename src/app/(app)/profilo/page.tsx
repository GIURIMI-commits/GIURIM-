"use client";

import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { profile, loading } = useProfile();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    if (loading) return <div>Caricamento...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-serif font-bold">Il tuo Profilo</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Informazioni Personali</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-500">Nome Visualizzato</label>
                        <p className="text-lg">{profile?.display_name || '-'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-500">Ruolo</label>
                        <p className="text-lg capitalize">{profile?.role?.replace('_', ' ') || '-'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-500">Membro dal</label>
                        <p className="text-lg">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button variant="destructive" onClick={handleLogout}>
                    Disconnetti
                </Button>
            </div>
        </div>
    );
}
