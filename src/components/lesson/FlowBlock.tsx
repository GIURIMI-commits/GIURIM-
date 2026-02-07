import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import React from 'react';

interface FlowBlockProps {
    children: React.ReactNode;
}

export function FlowBlock({ children }: FlowBlockProps) {
    // Attempt to extract string content to parse "->"
    let steps: string[] = [];

    // Helper to extract text recursively
    const extractText = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (React.isValidElement(node) && (node as React.ReactElement<any>).props.children) {
            return extractText((node as React.ReactElement<any>).props.children);
        }
        return '';
    };

    const textContent = extractText(children);

    if (textContent.includes('→') || textContent.includes('->')) {
        steps = textContent.split(/→|->/).map(s => s.trim()).filter(Boolean);
    }

    if (steps.length > 0) {
        return (
            <div className="my-10 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <div className="relative group flex-1 w-full md:w-auto">
                                <div className="p-4 bg-white dark:bg-neutral-800 border-2 border-neutral-100 dark:border-neutral-700 rounded-xl shadow-sm group-hover:border-primary/20 group-hover:shadow-md transition-all text-center">
                                    <span className="block text-xs uppercase tracking-wider text-neutral-400 mb-1 font-semibold">Step {idx + 1}</span>
                                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">{step}</span>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center py-2 text-neutral-300">
                                        <ArrowRight className="w-5 h-5 rotate-90" />
                                    </div>
                                )}
                            </div>

                            {idx < steps.length - 1 && (
                                <div className="hidden md:block text-neutral-300 dark:text-neutral-600">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }

    // Fallback if parsing fails
    return (
        <div className="my-8 p-6 bg-neutral-50 dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl text-center font-medium">
            {children}
        </div>
    );
}
