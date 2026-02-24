"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AreaMeta } from "@/types/content";
import { cn } from "@/lib/utils";
import {
    Scale, Landmark, Users, Gavel, Building, Scale as Balance,
    ChevronRight, ChevronDown, CheckCircle2, Circle, BookOpen, FileText, PlayCircle, Menu, X, GripHorizontal
} from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";

const iconMap: { [key: string]: any } = {
    scale: Scale,
    landmark: Landmark,
    users: Users,
    gavel: Gavel,
    building: Building,
    balance: Balance,
};

interface MobileLessonNavProps {
    curriculum: AreaMeta[];
}

export function MobileLessonNav({ curriculum }: MobileLessonNavProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set());
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

    const { isCompleted, getGlobalStats } = useCourseProgress(curriculum);
    const { percentage } = getGlobalStats();

    // Touch Handling State
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const sheetRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-expand logic based on current route
    useEffect(() => {
        const newExpandedAreas = new Set<string>();
        const newExpandedModules = new Set<string>();

        curriculum.forEach(area => {
            const areaPath = `/learn/${area.slug}`;
            if (pathname.startsWith(areaPath)) {
                newExpandedAreas.add(area.slug);
                area.modules?.forEach(mod => {
                    const modulePath = `${areaPath}/${mod.slug}`;
                    if (pathname.startsWith(modulePath)) {
                        newExpandedModules.add(`${area.slug}/${mod.slug}`);
                    }
                });
            }
        });

        if (newExpandedAreas.size > 0) setExpandedAreas(newExpandedAreas);
        if (newExpandedModules.size > 0) setExpandedModules(newExpandedModules);

        // Auto-close on navigation change (when the user clicks a link)
        setIsOpen(false);
    }, [pathname, curriculum]);

    // Handle body scroll locking when sheet is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setCurrentY(0); // reset position just in case
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

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

    // --- Touch / Swipe Logic ---
    const handleTouchStart = (e: React.TouchEvent) => {
        // Only allow dragging if we swipe down from the top handle or if we are at the top of the scrollable content
        const scrollTop = contentRef.current?.scrollTop || 0;
        if (scrollTop <= 0) {
            setIsDragging(true);
            setStartY(e.touches[0].clientY);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;

        const y = e.touches[0].clientY;
        const deltaY = y - startY;

        // Prevent dragging upwards past the top
        if (deltaY > 0) {
            // e.preventDefault(); // Sometimes needed depending on the browser to stop pull-to-refresh
            setCurrentY(deltaY);
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        // If swiped down more than 100px, close it
        if (currentY > 100) {
            setIsOpen(false);
        } else {
            // Otherwise animate back to top
            setCurrentY(0);
        }
    };

    const sheetTranslateY = isDragging ? `${currentY}px` : isOpen ? "0%" : "100%";
    const transitionStyle = isDragging ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)";

    return (
        <div className="md:hidden">
            {/* Sticky Floating Button */}
            {!isOpen && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-max z-[100] pb-safe">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground dark:bg-white dark:text-neutral-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.18)] font-semibold text-[15px] active:scale-95 transition-transform"
                    >
                        <span>📑 Indice</span>
                    </button>
                </div>
            )}

            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Bottom Sheet */}
            <div
                ref={sheetRef}
                className={cn(
                    "fixed inset-x-0 bottom-0 z-50 h-[85vh] bg-white dark:bg-neutral-950 rounded-t-3xl shadow-2xl flex flex-col border-t border-neutral-200 dark:border-neutral-800"
                )}
                style={{
                    transform: `translateY(${sheetTranslateY})`,
                    transition: transitionStyle
                }}
            >
                {/* Drag Handle & Header */}
                <div
                    className="flex flex-col items-center pt-3 pb-4 rounded-t-3xl"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Visual Handle */}
                    <div className="w-12 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-4" />

                    <div className="w-full px-6 flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="font-serif font-bold text-xl text-neutral-900 dark:text-white flex items-center gap-2">
                                📑 Indice
                            </div>
                            <div className="text-xs font-semibold text-neutral-500 mt-0.5">
                                Progresso: <span className="text-primary">{percentage}%</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 -mr-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded-full bg-neutral-100 dark:bg-neutral-900"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div
                    ref={contentRef}
                    className="flex-1 overflow-y-auto px-4 pb-12 w-full"
                    onTouchStart={(e) => {
                        // Attach identical touch logic to content so dragging the very top of content passes down
                        if ((e.currentTarget as HTMLDivElement).scrollTop <= 0) {
                            handleTouchStart(e);
                        }
                    }}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="space-y-6">
                        {curriculum.map((area) => {
                            const Icon = iconMap[area.icon || 'scale'] || Scale;
                            const isAreaExpanded = expandedAreas.has(area.slug);
                            const isAreaActive = pathname.startsWith(`/learn/${area.slug}`);

                            return (
                                <div key={area.slug} className="space-y-2">
                                    {/* Area Header */}
                                    <button
                                        onClick={() => toggleArea(area.slug)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left",
                                            isAreaActive
                                                ? "bg-neutral-100 dark:bg-neutral-800/60 text-neutral-900 dark:text-white font-bold shadow-sm"
                                                : "bg-neutral-50 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300 border border-transparent dark:border-neutral-800/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-2 rounded-lg",
                                                isAreaActive ? "bg-white dark:bg-neutral-800 shadow-sm" : "bg-white dark:bg-neutral-800"
                                            )}>
                                                <Icon className={cn("h-5 w-5", isAreaActive ? "text-primary dark:text-indigo-400" : "text-neutral-500 dark:text-neutral-400")} />
                                            </div>
                                            <span className="text-base">{area.title}</span>
                                        </div>
                                        <ChevronRight className={cn(
                                            "h-5 w-5 text-neutral-400 transition-transform duration-200",
                                            isAreaExpanded && "rotate-90"
                                        )} />
                                    </button>

                                    {/* Modules List */}
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-300 ease-in-out",
                                        isAreaExpanded ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                                    )}>
                                        <div className="ml-5 pl-4 border-l-2 border-neutral-100 dark:border-neutral-800 space-y-4">
                                            {area.modules?.map(mod => {
                                                const moduleKey = `${area.slug}/${mod.slug}`;
                                                const isModuleExpanded = expandedModules.has(moduleKey);
                                                const modulePath = `/learn/${area.slug}/${mod.slug}`;
                                                const isModuleActive = pathname.startsWith(modulePath);

                                                return (
                                                    <div key={mod.slug} className="space-y-2">
                                                        <button
                                                            onClick={() => toggleModule(moduleKey)}
                                                            className={cn(
                                                                "w-full flex items-start justify-between text-left group",
                                                                isModuleActive
                                                                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                                                    : "text-neutral-600 dark:text-neutral-300"
                                                            )}
                                                        >
                                                            <span className="text-[15px] pr-4 leading-snug">{mod.title}</span>
                                                            {mod.lessons && mod.lessons.length > 0 && (
                                                                <ChevronRight className={cn(
                                                                    "h-4 w-4 mt-0.5 flex-shrink-0 transition-transform text-neutral-400 dark:text-neutral-500",
                                                                    isModuleExpanded && "rotate-90 text-indigo-500"
                                                                )} />
                                                            )}
                                                        </button>

                                                        {/* Lessons List */}
                                                        {isModuleExpanded && mod.lessons && (
                                                            <div className="space-y-1 mt-2">
                                                                {mod.lessons.map((lesson) => {
                                                                    const lessonPath = `${modulePath}/${lesson.slug}`;
                                                                    const isLessonActive = pathname === lessonPath;

                                                                    return (
                                                                        <Link
                                                                            key={lesson.slug}
                                                                            href={lessonPath}
                                                                            onClick={() => setIsOpen(false)}
                                                                            className={cn(
                                                                                "flex items-start gap-3 p-3 rounded-lg text-sm transition-colors relative",
                                                                                isLessonActive
                                                                                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium"
                                                                                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                                            )}
                                                                        >
                                                                            {isLessonActive && (
                                                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-indigo-600 dark:bg-indigo-400 rounded-r-md -ml-4" />
                                                                            )}
                                                                            {isCompleted(lesson.slug) ? (
                                                                                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500 dark:text-green-400" />
                                                                            ) : isLessonActive ? (
                                                                                <PlayCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
                                                                            ) : (
                                                                                <Circle className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-40 dark:opacity-50" />
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
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
