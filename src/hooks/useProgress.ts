"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LessonProgress } from '@/types/user';

export function useProgress(lessonSlug: string) {
    const [progress, setProgress] = useState<LessonProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchProgress() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from('lesson_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('lesson_slug', lessonSlug)
                .single();

            if (data) setProgress(data);
            setLoading(false);
        }

        fetchProgress();
    }, [lessonSlug]);

    const updateProgress = async (status: 'in_progress' | 'completed') => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const updates = {
            user_id: user.id,
            lesson_slug: lessonSlug,
            status,
            completed_at: status === 'completed' ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('lesson_progress')
            .upsert(updates, { onConflict: 'user_id,lesson_slug' })
            .select()
            .single();

        if (data) setProgress(data as LessonProgress);
    };

    return { progress, loading, updateProgress };
}
