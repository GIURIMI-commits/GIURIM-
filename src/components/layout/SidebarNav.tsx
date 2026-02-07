"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AreaMeta, ModuleMeta, LessonMeta } from "@/types/content";
import { cn } from "@/lib/utils";
import {
    Scale, Landmark, Users, Gavel, Building, Scale as Balance,
    ChevronRight, ChevronDown, CheckCircle2, Circle, BookOpen, FileText, PlayCircle
} from "lucide-react";
import { useState, useEffect } from "react";

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
                                    ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100 font-semibold"
                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            )}
                            onClick={() => toggleArea(area.slug)}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className={cn("h-4 w-4", isAreaActive ? "text-primary" : "text-neutral-500")} />
                                <span className="text-sm">{area.title}</span>
                            </div>
                            <ChevronRight className={cn(
                                "h-3 w-3 text-neutral-400 transition-transform duration-200",
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
                                                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
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
                                                                    "flex items-start gap-2 py-1.5 px-2 rounded -ml-2 text-xs transition-colors",
                                                                    isLessonActive
                                                                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium"
                                                                        : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                                )}
                                                            >
                                                                {isLessonActive ? (
                                                                    <PlayCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                                                ) : (
                                                                    <FileText className="h-3 w-3 mt-0.5 flex-shrink-0 opacity-50" />
                                                                )}
                                                                <span className="leading-tight">{lesson.title}</span>
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
    );
}
