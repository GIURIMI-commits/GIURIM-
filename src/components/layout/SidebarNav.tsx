"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AreaMeta, ModuleMeta, LessonMeta } from "@/types/content";
import { cn } from "@/lib/utils";
import {
    Scale, Landmark, Users, Gavel, Building, Scale as Balance,
    ChevronRight, ChevronLeft, ChevronDown, CheckCircle2, Circle, BookOpen, FileText, PlayCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCourseProgress } from "@/hooks/useCourseProgress";

const iconMap: { [key: string]: any } = {
    scale: Scale,
    landmark: Landmark,
    users: Users,
    gavel: Gavel,
    building: Building,
    balance: Balance,
};

interface SidebarNavProps {
    curriculum: AreaMeta[];
}

export function SidebarNav({ curriculum }: SidebarNavProps) {
    const pathname = usePathname();
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
    const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set());
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { isCompleted, getAreaStats, getGlobalStats } = useCourseProgress(curriculum);
    const globalStats = getGlobalStats();

    // Auto-expand based on current path
    useEffect(() => {
        const newExpandedAreas = new Set(expandedAreas);
        const newExpandedModules = new Set(expandedModules);
        let hasChanges = false;

        curriculum.forEach(area => {
            const areaPath = `/learn/${area.slug}`;
            const isAreaActive = pathname.startsWith(areaPath);

            if (isAreaActive) {
                if (!newExpandedAreas.has(area.slug)) {
                    newExpandedAreas.add(area.slug);
                    hasChanges = true;
                }

                area.modules?.forEach(mod => {
                    const modulePath = `${areaPath}/${mod.slug}`;
                    const isModuleActive = pathname.startsWith(modulePath);

                    if (isModuleActive) {
                        const moduleKey = `${area.slug}/${mod.slug}`;
                        if (!newExpandedModules.has(moduleKey)) {
                            newExpandedModules.add(moduleKey);
                            hasChanges = true;
                        }
                    }
                });
            }
        });

        if (hasChanges) {
            setExpandedAreas(newExpandedAreas);
            setExpandedModules(newExpandedModules);
        }
    }, [pathname, curriculum]); // Run on mount and path change

    // Auto-collapse on tablet screens (768px - 1024px)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setIsCollapsed(true);
            } else if (window.innerWidth >= 1024) {
                setIsCollapsed(false);
            }
        };

        // Run once on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleArea = (slug: string) => {
        const next = new Set(expandedAreas);
        if (next.has(slug)) next.delete(slug);
        else next.add(slug);
        setExpandedAreas(next);
    };

    const toggleModule = (key: string) => {
        const next = new Set(expandedModules);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        setExpandedModules(next);
    };

    return (
        <aside className={cn(
            "relative border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 hidden md:flex flex-col shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300",
            isCollapsed ? "w-16" : "w-64"
        )}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full p-1 z-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-sm"
                title={isCollapsed ? "Espandi Indice" : "Riduci Indice"}
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4 text-foreground" /> : <ChevronLeft className="w-4 h-4 text-foreground" />}
            </button>

            <div className={cn(
                "h-full overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 w-full",
                isCollapsed ? "hidden" : "p-4"
            )}>
                <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                        Indice Contenuti
                    </div>
                </div>

                <Link href="/mappa" className="flex items-center gap-2 mb-4 px-2 py-1.5 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors">
                    <span className="text-base">🗺️</span> Mappa Ordinamento
                </Link>

                {/* Global Progress */}
                {globalStats.total > 0 && (
                    <div className="mb-6 px-1">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                            <span>Progresso Globale</span>
                            <span className="font-medium">{globalStats.percentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${globalStats.percentage}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-6 pb-10">
                    {curriculum.map((area) => {
                        const Icon = iconMap[area.icon || 'scale'] || Scale;
                        const isAreaExpanded = expandedAreas.has(area.slug);
                        const isAreaActive = pathname.startsWith(`/learn/${area.slug}`);

                        return (
                            <div key={area.slug} className="space-y-1">
                                {/* Area Header */}
                                <div
                                    className={cn(
                                        "flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group transition-colors",
                                        isAreaActive
                                            ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-white font-semibold"
                                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                                    )}
                                    onClick={() => toggleArea(area.slug)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className={cn("h-4 w-4", isAreaActive ? "text-primary dark:text-indigo-400" : "text-neutral-500 dark:text-neutral-400 group-hover:dark:text-neutral-300")} />
                                        <span className="text-sm">{area.title}</span>
                                    </div>
                                    <ChevronRight className={cn(
                                        "h-3 w-3 text-neutral-400 dark:text-neutral-500 transition-transform duration-200",
                                        isAreaExpanded && "rotate-90"
                                    )} />
                                </div>

                                {/* Modules List */}
                                {isAreaExpanded && area.modules && (
                                    <div className="ml-4 space-y-4 border-l border-neutral-200 dark:border-neutral-800 pl-3 py-1">
                                        {area.modules.map(mod => {
                                            const moduleKey = `${area.slug}/${mod.slug}`;
                                            const isModuleExpanded = expandedModules.has(moduleKey);
                                            const modulePath = `/learn/${area.slug}/${mod.slug}`;
                                            const isModuleActive = pathname.startsWith(modulePath);

                                            return (
                                                <div key={mod.slug} className="space-y-1">
                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-between cursor-pointer group text-sm",
                                                            isModuleActive
                                                                ? "text-indigo-600 dark:text-indigo-400 font-medium"
                                                                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                                                        )}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleModule(moduleKey);
                                                        }}
                                                    >
                                                        <span>{mod.title}</span>
                                                        {mod.lessons && mod.lessons.length > 0 && (
                                                            <ChevronRight className={cn(
                                                                "h-3 w-3 opacity-50 transition-transform",
                                                                isModuleExpanded && "rotate-90"
                                                            )} />
                                                        )}
                                                    </div>

                                                    {/* Lessons List */}
                                                    {isModuleExpanded && mod.lessons && (
                                                        <div className="space-y-0.5 mt-1 ml-1">
                                                            {mod.lessons.map((lesson) => {
                                                                const lessonPath = `${modulePath}/${lesson.slug}`;
                                                                const isLessonActive = pathname === lessonPath;

                                                                return (
                                                                    <Link
                                                                        key={lesson.slug}
                                                                        href={lessonPath}
                                                                        className={cn(
                                                                            "flex items-start gap-2 py-1.5 px-2 rounded -ml-2 text-xs transition-colors group/lesson",
                                                                            isLessonActive
                                                                                ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium"
                                                                                : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-200"
                                                                        )}
                                                                    >
                                                                        {isCompleted(lesson.slug) ? (
                                                                            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-green-500 dark:text-green-400" />
                                                                        ) : isLessonActive ? (
                                                                            <PlayCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
                                                                        ) : (
                                                                            <Circle className="h-3 w-3 mt-0.5 ml-0.5 flex-shrink-0 opacity-40 dark:opacity-50 group-hover/lesson:dark:opacity-80" />
                                                                        )}
                                                                        <span className={cn("leading-tight", isCompleted(lesson.slug) && !isLessonActive ? "opacity-70" : "")}>
                                                                            {lesson.title}
                                                                        </span>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Collapsed View placeholder */}
            {isCollapsed && (
                <div className="h-full flex flex-col items-center pt-6 opacity-50 cursor-pointer hover:opacity-100 transition-opacity" onClick={() => setIsCollapsed(false)}>
                    <BookOpen className="w-5 h-5 mb-4 text-foreground" />
                    <div className="text-[10px] uppercase font-bold text-neutral-500" style={{ writingMode: "vertical-rl" }}>INDICE</div>
                </div>
            )}
        </aside>
    );
}
