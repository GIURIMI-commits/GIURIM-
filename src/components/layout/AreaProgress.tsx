"use client";

import { useCourseProgress } from "@/hooks/useCourseProgress";
import { AreaMeta } from "@/types/content";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaProgressProps {
    areaSlug: string;
    modulesWithLessons: any[];
}

// Reconstructing the area object to satisfy the hook signature
export function AreaProgress({ areaSlug, modulesWithLessons }: AreaProgressProps) {
    // Generate dummy area for stats
    const dummyArea: AreaMeta = {
        slug: areaSlug,
        title: "",
        description: "",
        order: 0,
        modules: modulesWithLessons
    };

    const curriculum = [dummyArea];
    const { getAreaStats, getModuleStats } = useCourseProgress(curriculum);

    const areaStats = getAreaStats(dummyArea);

    if (areaStats.total === 0) return null;

    return (
        <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-neutral-500 tracking-wider uppercase mb-2">Progresso dell'Area</h3>
                <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                        {areaStats.percentage}%
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full max-w-sm">
                <div className="flex justify-between text-xs text-neutral-500 mb-2">
                    <span>{areaStats.completed} lezioni completate</span>
                    <span>{areaStats.total} totali</span>
                </div>
                <div className="h-2.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-1000 ease-out"
                        style={{ width: `${areaStats.percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export function ModuleProgress({ moduleData, curriculum }: { moduleData: any, curriculum: any[] }) {
    const { getModuleStats } = useCourseProgress(curriculum);
    const stats = getModuleStats(moduleData);

    if (stats.total === 0) return null;

    const isComplete = stats.percentage === 100;

    return (
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                {isComplete ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completato
                    </span>
                ) : (
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {stats.completed} di {stats.total} lezioni
                    </span>
                )}
            </div>
            {!isComplete && (
                <div className="h-1.5 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${stats.percentage}%` }}
                    />
                </div>
            )}
        </div>
    );
}
