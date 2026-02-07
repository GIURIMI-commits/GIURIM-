"use client";

import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Flame, BookOpen, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { profile, loading } = useProfile();

    if (loading) return <div>Caricamento...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold">Ciao, {profile?.display_name || 'Studente'}! 👋</h1>
                <p className="text-neutral-500">Ecco i tuoi progressi su GUIRIMì.</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Flame}
                    label="Streak Giornaliero"
                    value={`${profile?.streak_current || 0} giorni`}
                    color="text-orange-500 bg-orange-100 dark:bg-orange-900/30"
                />
                <StatCard
                    icon={BookOpen}
                    label="Lezioni Completate"
                    // TODO: Fetch real count
                    value="0"
                    color="text-blue-500 bg-blue-100 dark:bg-blue-900/30"
                />
                <StatCard
                    icon={Trophy}
                    label="Punteggio Medio"
                    // TODO: Fetch real avg
                    value="-"
                    color="text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30"
                />
            </div>

            {/* CONTINUE LEARNING */}
            <section>
                <h2 className="text-xl font-bold mb-4">Continua a studiare</h2>
                {/* Placeholder for "Next Lesson" logic */}
                <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                        <div className="text-sm font-bold text-primary uppercase tracking-wider mb-1">PROSSIMA LEZIONE CONSIGLIATA</div>
                        <CardTitle>Perché esistono le regole?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-neutral-500 mb-4">Fondamenta del Diritto • Modulo 1.1</p>
                        <Link href="/learn/area-1-fondamenta/mod-1.1-cose-il-diritto/lez-1.1.1">
                            <Button>Riprendi Lezione</Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>

            {/* OVERALL PROGRESS */}
            <section>
                <h2 className="text-xl font-bold mb-4">Il tuo percorso</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Progresso Generale</span>
                            <span>0%</span>
                        </div>
                        <ProgressBar value={0} />
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 pt-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-neutral-500">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}
