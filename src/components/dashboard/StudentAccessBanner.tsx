"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GraduationCap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type StudentStatus = 'none' | 'pending' | 'verified' | 'rejected';

export function StudentAccessBanner() {
    const [status, setStatus] = useState<StudentStatus | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function checkStatus() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                setEmail(user.email ?? null);

                // Fetch profile status
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('student_status')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setStatus(profile.student_status as StudentStatus);
                }
            } finally {
                setLoading(false);
            }
        }
        checkStatus();
    }, [supabase]);

    const handleVerify = async () => {
        setVerifying(true);
        try {
            const res = await fetch('/api/student/verify', { method: 'POST' });
            const data = await res.json();
            if (data.status === 'verified') {
                setStatus('verified');
            } else if (data.status === 'pending_domain') {
                setStatus('pending');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setVerifying(false);
        }
    };

    if (loading || !status || status === 'verified') return null; // Don't show if already verified or loading

    // If status is 'none' or 'pending', show banner
    // But maybe we only want to show if they have an .edu/.it email? 
    // For now, simpler: show to everyone who is not verified, encouraging them to connect execution.
    // Actually, user request said "Se il dominio non è in allowlist... CTA Richiedi attivazione".

    // Logic: 
    // 1. If 'none': Show "Are you a student? Connect institutional email"
    // 2. If 'pending': Show "Domain not yet supported. We recorded your request."

    const isEduEmail = email?.includes('.edu') || email?.endsWith('.it'); // heuristic

    return (
        <Card className="mb-6 border-indigo-100 bg-indigo-50/50 dark:bg-indigo-950/20 dark:border-indigo-900 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg h-fit">
                        <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-indigo-950 dark:text-indigo-100">
                            Sei uno studente universitario?
                        </h3>
                        <p className="text-sm text-indigo-800/80 dark:text-indigo-200/80">
                            Registrati con la tua email istituzionale per sbloccare l'accesso gratuito completo.
                        </p>
                    </div>
                </div>

                {status === 'pending' ? (
                    <Button disabled variant="outline" className="border-indigo-200 bg-indigo-100/50 text-indigo-700">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Dominio in revisione
                    </Button>
                ) : (
                    <Button onClick={handleVerify} disabled={verifying} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                        {verifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                        Verifica Accesso
                    </Button>
                )}
            </div>
        </Card>
    );
}
