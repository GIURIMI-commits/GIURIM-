import React from 'react';
import { CardBlock } from './LayoutBlocks';
import { Row, Col } from './LayoutBlocks';
import { cn } from '@/lib/utils';
import { Target, ArrowRightLeft } from 'lucide-react';

export function Objective({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-bold uppercase text-xs tracking-wider">
                <Target className="w-4 h-4" />
                Obiettivo
            </div>
            <div className="text-lg text-emerald-900 dark:text-emerald-100 font-medium">
                {children}
            </div>
        </div>
    );
}

interface CompareProps {
    aTitle: string;
    aBody: string;
    bTitle: string;
    bBody: string;
    cTitle?: string;
    cBody?: string;
}

export function Compare({ aTitle, aBody, bTitle, bBody, cTitle, cBody }: CompareProps) {
    return (
        <div className="my-8">
            <div className="flex items-center gap-2 mb-4 text-neutral-500 font-serif italic text-sm">
                <ArrowRightLeft className="w-4 h-4" />
                Confronto
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardBlock title={aTitle} className="bg-neutral-50 dark:bg-neutral-900/50">
                    {aBody}
                </CardBlock>
                <CardBlock title={bTitle} className="bg-neutral-50 dark:bg-neutral-900/50">
                    {bBody}
                </CardBlock>
                {cTitle && cBody && (
                    <CardBlock title={cTitle} className="bg-white dark:bg-neutral-900 border-indigo-200 dark:border-indigo-800 border-2 shadow-sm md:col-span-2 lg:col-span-1">
                        {cBody}
                    </CardBlock>
                )}
            </div>
        </div>
    );
}

interface SectionTitleProps {
    step?: number | string;
    title: string;
    children?: React.ReactNode;
}

export function SectionTitle({ step, title, children }: SectionTitleProps) {
    return (
        <div className="mt-16 mb-8 not-prose">
            <div className="flex items-center gap-4 mb-4">
                {step && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-lg font-serif">
                        {step}
                    </div>
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white font-serif m-0">
                    {title}
                </h2>
            </div>
            {children && (
                <div className="text-lg text-neutral-600 dark:text-neutral-400 font-medium md:pl-14">
                    {children}
                </div>
            )}
        </div>
    );
}
