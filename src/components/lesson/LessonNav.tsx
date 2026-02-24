"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

interface LessonNavProps {
    prevSlug?: string | null;
    nextSlug?: string | null;
    areaSlug: string;
    moduleSlug: string;
    currentSlug: string;
}

export function LessonNav({ prevSlug, nextSlug, areaSlug, moduleSlug, currentSlug }: LessonNavProps) {
    // Logic to build hrefs
    // Assumes structure /learn/[area]/[module]/[lesson]
    // Ideally we should look up if prev/next are in same module or cross-module.
    // For MVP scaffold, assumes same module or full path in slug?
    // Actually content loader returns next_lesson slug. We probably need to know its module too if it changes.
    // BUT: for MVP, let's assume next_lesson is just the slug. 
    // We need to find where it lives or pass the full URL.
    // Simplification: In this scaffold, let's assume valid relative navigation if in same module,
    // or simple slug navigation if we handle routing by slug globally or by context.
    // Given structure /learn/[area]/[module]/[lesson], we need area/module.

    // NOTE: This implementation assumes navigation within the same module for simplicity
    const baseUrl = `/learn/${areaSlug}/${moduleSlug}`;

    const { progress, updateProgress } = useProgress(currentSlug);
    const isCompleted = progress?.status === 'completed';

    return (
        <div className="mt-12 pt-8 border-t flex flex-col gap-8">
            {/* Completion Trigger */}
            <div className="flex flex-col items-center justify-center">
                {isCompleted ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-500 font-medium bg-green-50 dark:bg-green-500/10 px-6 py-3 rounded-full">
                        <CheckCircle2 className="w-5 h-5" />
                        Lezione Completata
                    </div>
                ) : (
                    <Button
                        onClick={() => updateProgress('completed')}
                        className="gap-2 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        <Circle className="w-5 h-5 opacity-70" />
                        Segna come completata
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                {prevSlug ? (
                    <Link href={`${baseUrl}/${prevSlug}`}>
                        <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                            <ArrowLeft className="h-4 w-4" />
                            Precedente
                        </Button>
                    </Link>
                ) : (
                    <div />
                )}

                {nextSlug ? (
                    <Link href={`${baseUrl}/${nextSlug}`}>
                        <Button variant="ghost" className="gap-2 pr-0 hover:pr-2 transition-all">
                            Successiva
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                ) : (
                    <Link href={`/learn/${areaSlug}`}>
                        <Button variant="outline">Torna all'Area</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
