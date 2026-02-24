import { getArea } from '@/lib/content/loader';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

export default async function AreaAccessLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ areaSlug: string }>;
}) {
    const { areaSlug } = await params;

    // 1. Get the area details to check its order
    const area = await getArea(areaSlug);
    if (!area) {
        notFound();
    }

    // 2. Only protect areas 3, 4, 5, etc.
    if (area.order > 2) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            redirect('/login?next=/learn/' + areaSlug);
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('student_status, subscription_tier')
            .eq('id', user.id)
            .single();

        const hasFullAccess = profile?.student_status === 'verified' || profile?.subscription_tier === 'pro';

        if (!hasFullAccess) {
            redirect('/profilo?upgrade=true'); // Redirect them to upgrade/verify
        }
    }

    return (
        <section>
            {children}
        </section>
    );
}
