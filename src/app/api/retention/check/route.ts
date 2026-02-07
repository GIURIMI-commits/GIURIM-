import { checkPendingRetentionTests } from '@/lib/quiz/retention';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pendingTests = await checkPendingRetentionTests(user.id);

    return NextResponse.json({ pendingTests });
}
