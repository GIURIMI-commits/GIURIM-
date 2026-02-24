"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AreaMeta, ModuleMeta } from '@/types/content';
import { LessonProgress } from '@/types/user';

export function useCourseProgress(curriculum: AreaMeta[]) {
    const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchAllProgress = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // LocalStorage fallback
            try {
                const localData = localStorage.getItem('giurimi_progress');
                if (localData) {
                    setProgressMap(JSON.parse(localData));
                }
            } catch (e) {
                console.error("Error loading global progress", e);
            }
            setLoading(false);
            return;
        }

        // Supabase load
        const { data } = await supabase
            .from('lesson_progress')
            .select('*')
            .eq('user_id', user.id);

        if (data) {
            const map: Record<string, LessonProgress> = {};
            data.forEach(p => {
                map[p.lesson_slug] = p;
            });
            setProgressMap(map);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllProgress();

        // Listen for internal updates from useProgress hook bypassing reload
        const handleUpdate = () => {
            fetchAllProgress();
        };

        window.addEventListener('giurimi_progress_updated', handleUpdate);
        return () => window.removeEventListener('giurimi_progress_updated', handleUpdate);
    }, []);

    // Helpers to calc stats
    const isCompleted = (lessonSlug: string) => {
        return progressMap[lessonSlug]?.status === 'completed';
    };

    const getModuleStats = (mod: ModuleMeta) => {
        if (!mod.lessons || mod.lessons.length === 0) return { total: 0, completed: 0, percentage: 0 };
        const total = mod.lessons.length;
        const completed = mod.lessons.filter(l => isCompleted(l.slug)).length;
        return { total, completed, percentage: Math.round((completed / total) * 100) };
    };

    const getAreaStats = (area: AreaMeta) => {
        if (!area.modules) return { total: 0, completed: 0, percentage: 0 };
        let total = 0;
        let completed = 0;
        area.modules.forEach(mod => {
            if (mod.lessons) {
                total += mod.lessons.length;
                completed += mod.lessons.filter(l => isCompleted(l.slug)).length;
            }
        });
        return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
    };

    const getGlobalStats = () => {
        let total = 0;
        let completed = 0;
        curriculum.forEach(area => {
            const stats = getAreaStats(area);
            total += stats.total;
            completed += stats.completed;
        });
        return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
    };

    return {
        progressMap,
        loading,
        isCompleted,
        getModuleStats,
        getAreaStats,
        getGlobalStats,
        refresh: fetchAllProgress
    };
}
