import { createClient } from '@/lib/supabase/server';

export async function scheduleRetentionTest(userId: string, lessonSlug: string) {
    const supabase = await createClient(); // Use AWAIT if it's the server version! But wait, createClient in server.ts is async.

    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 7); // +7 days

    const { error } = await supabase
        .from('retention_tests')
        .insert({
            user_id: userId,
            lesson_slug: lessonSlug,
            scheduled_at: scheduledDate.toISOString(),
        });

    if (error) {
        console.error('Error scheduling retention test:', error);
        return false;
    }
    return true;
}

export async function checkPendingRetentionTests(userId: string) {
    const supabase = await createClient();
    const now = new Date().toISOString();

    const { data } = await supabase
        .from('retention_tests')
        .select('*')
        .eq('user_id', userId)
        .lt('scheduled_at', now)
        .is('completed_at', null);

    return data || [];
}
