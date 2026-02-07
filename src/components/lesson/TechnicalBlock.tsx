"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function TechnicalBlock({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-8 border rounded-md bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    <ScrollText className="h-4 w-4" />
                    Versione Tecnica
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <div
                className={cn(
                    "transition-all duration-300 ease-in-out border-t border-neutral-200 dark:border-neutral-700",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden border-t-0"
                )}
            >
                <div className="p-6 text-sm font-mono leading-relaxed bg-white dark:bg-black text-neutral-600 dark:text-neutral-400">
                    {children}
                </div>
            </div>
        </div>
    );
}
