import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Fetch Profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        // 2. Fetch Lesson Progress
        const { data: progress } = await supabase
            .from('lesson_progress')
            .select('*')
            .eq('user_id', user.id);

        // 3. Fetch Quiz Attempts
        const { data: quizzes } = await supabase
            .from('quiz_attempts')
            .select('*')
            .eq('user_id', user.id);

        // 4. Fetch Corte Activity (Threads, Comments, Votes)
        const { data: threads } = await supabase
            .from('corte_threads')
            .select('*')
            .eq('author_id', user.id);

        const { data: comments } = await supabase
            .from('corte_comments')
            .select('*')
            .eq('author_id', user.id);

        const { data: votes } = await supabase
            .from('corte_votes')
            .select('*')
            .eq('user_id', user.id);

        // Construct Export Object
        const exportData = {
            user: {
                id: user.id,
                email: user.email,
                metadata: user.user_metadata,
                created_at: user.created_at,
            },
            profile,
            learning: {
                progress,
                quizzes,
            },
            community: {
                threads,
                comments,
                votes
            },
            export_date: new Date().toISOString(),
        };

        // Return JSON with headers to force download
        return new NextResponse(JSON.stringify(exportData, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="giurimi-data-${user.id}.json"`,
            },
        });

    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
