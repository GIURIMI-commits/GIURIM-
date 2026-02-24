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
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // FALLBACK: LocalStorage
                try {
                    const localData = localStorage.getItem('giurimi_progress');
                    if (localData) {
                        const parsedData: Record<string, LessonProgress> = JSON.parse(localData);
                        if (parsedData[lessonSlug]) {
                            setProgress(parsedData[lessonSlug]);
                        }
                    }
                } catch (e) {
                    console.error('Error reading localStorage progress', e);
                }
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

        const updates: Partial<LessonProgress> = {
            lesson_slug: lessonSlug,
            status,
            completed_at: status === 'completed' ? new Date().toISOString() : null,
        };

        if (user) {
            updates.user_id = user.id;
        }

        if (!user) {
            // FALLBACK: LocalStorage
            try {
                const localData = localStorage.getItem('giurimi_progress');
                const parsedData: Record<string, LessonProgress> = localData ? JSON.parse(localData) : {};

                // Keep the record
                parsedData[lessonSlug] = updates as LessonProgress;
                localStorage.setItem('giurimi_progress', JSON.stringify(parsedData));
                setProgress(updates as LessonProgress);

                // Dispatch a custom event so other components (like Sidebar) can react immediately
                window.dispatchEvent(new Event('giurimi_progress_updated'));
            } catch (e) {
                console.error('Error saving localStorage progress', e);
            }
            return;
        }

        const { data, error } = await supabase
            .from('lesson_progress')
            .upsert(updates as any, { onConflict: 'user_id,lesson_slug' })
            .select()
            .single();

        if (data) {
            setProgress(data as LessonProgress);
            window.dispatchEvent(new Event('giurimi_progress_updated'));
        }
    };

    return { progress, loading, updateProgress };
}
