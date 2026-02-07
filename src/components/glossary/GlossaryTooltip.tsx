"use client";

import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useGlossary } from '@/hooks/useGlossary';
import { cn } from '@/lib/utils';

// We might fetch the term definition client side or pass it. 
// For MDX, simplicity suggests passing `term` string and fetching or having it embedded.
// But usually we just have ID.
// Ideally, the parent fetcher injects the dictionary or we fetch on hover.
// For MVP, let's assume we might need to fetch or just show a placeholder if data not present.
// OR we rely on a context.

export function GlossaryTerm({ id, children }: { id: string; children: React.ReactNode }) {
    // In a real app we'd fetch the definition.
    // For MVP scaffold, visual only.

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-help border-b-2 border-dotted border-neutral-400 hover:border-primary hover:text-primary transition-colors inline-flex items-baseline gap-0.5">
                        {children}
                        {/* <Info className="h-3 w-3 self-center opacity-50" /> */}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs font-normal normal-case text-neutral-50 dark:text-neutral-900 bg-neutral-900 dark:bg-white">
                    <p className="font-semibold mb-1">Definizione di {children}</p>
                    <p className="text-xs opacity-90">
                        (Qui andrebbe la definizione per ID: {id})
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
