import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lessonSlug, score, answers } = body;

    const { error } = await supabase
        .from('quiz_attempts')
        .insert({
            user_id: user.id,
            lesson_slug: lessonSlug,
            score,
            answers,
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also update progress if passed
    if (score >= 60) {
        await supabase
            .from('lesson_progress')
            .upsert({
                user_id: user.id,
                lesson_slug: lessonSlug,
                status: 'completed',
                completed_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id, lesson_slug' });

        // Update user streak if applicable (logic to be implemented in DB trigger or here)
    }

    return NextResponse.json({ success: true });
}
