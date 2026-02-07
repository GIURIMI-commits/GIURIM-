import { Lightbulb } from 'lucide-react';

export function HookBlock({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-md flex gap-4">
            <Lightbulb className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div className="text-neutral-800 dark:text-neutral-200">
                <h4 className="font-bold text-amber-700 dark:text-amber-500 mb-2 uppercase text-xs tracking-wider">
                    Perché ti importa
                </h4>
                <div className="prose-sm">{children}</div>
            </div>
        </div>
    );
}
