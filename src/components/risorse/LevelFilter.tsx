"use client";

import { LivelloLettura } from "@/content/risorse";
import { cn } from "@/lib/utils";

interface LevelFilterProps {
    selectedLevel: LivelloLettura | "tutti";
    onLevelChange: (level: LivelloLettura | "tutti") => void;
}

export function LevelFilter({ selectedLevel, onLevelChange }: LevelFilterProps) {
    const levels: { id: LivelloLettura | "tutti"; label: string; icon: string }[] = [
        { id: "tutti", label: "Tutti i Livelli", icon: "📚" },
        { id: "principiante", label: "Principiante", icon: "🟢" },
        { id: "intermedio", label: "Intermedio", icon: "🟡" },
        { id: "avanzato", label: "Avanzato", icon: "🔴" }
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-8 items-center justify-center md:justify-start">
            <span className="text-sm font-medium text-neutral-500 mr-2 hidden md:inline-block">Filtra per Livello:</span>
            {levels.map((level) => {
                const isActive = selectedLevel === level.id;
                return (
                    <button
                        key={level.id}
                        onClick={() => onLevelChange(level.id)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 border",
                            isActive
                                ? "bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-sm"
                                : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                        )}
                    >
                        <span>{level.icon}</span>
                        {level.label}
                    </button>
                );
            })}
        </div>
    );
}
