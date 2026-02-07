import { Lightbulb, Sparkles } from 'lucide-react';

interface ConceptBlockProps {
    title?: string;
    children: React.ReactNode;
}

export function ConceptBlock({ title = "Concetto Chiave", children }: ConceptBlockProps) {
    return (
        <div className="my-10 relative overflow-hidden rounded-2xl border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-neutral-900 shadow-lg shadow-indigo-500/5">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600" />
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles className="w-24 h-24" />
            </div>

            <div className="p-6 pl-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-100 dark:ring-indigo-800">
                        <Lightbulb className="w-4 h-4" />
                    </span>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        {title}
                    </h3>
                </div>

                <div className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 font-medium">
                    {children}
                </div>
            </div>
        </div>
    );
}
