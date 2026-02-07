"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Assuming auto-confirm off or user check email
            // For MVP demo often we want instant login or redirect to check email
            // Let's redirect to onboarding or a check email page.
            // If Supabase is set to confirm email, we should show a message.
            // We'll assume we can redirect to onboarding if session established or tell them to check email.
            router.push('/login?registered=true');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-neutral-900 text-white p-3 rounded-full w-fit mb-4">
                        <Scale className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-serif font-bold">Crea Account</CardTitle>
                    <CardDescription>Unisciti a GUIRIMì e inizia a imparare.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nome Completo</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 border rounded-md"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-2 border rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full p-2 border rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Creazione account...' : 'Registrati'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-neutral-500">
                    Hai già un account? <Link href="/login" className="text-primary hover:underline ml-1">Accedi</Link>
                </CardFooter>
            </Card>
        </div>
    );
}
