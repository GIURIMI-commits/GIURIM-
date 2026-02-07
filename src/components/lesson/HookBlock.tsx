import { Lightbulb } from 'lucide-react';

export function HookBlock({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-10 pl-6 border-l-4 border-amber-400 dark:border-amber-500">
            <h4 className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-500 mb-3 uppercase text-xs tracking-widest">
                <Lightbulb className="h-4 w-4" />
                Perché ti importa
            </h4>
            <div className="text-xl md:text-2xl font-serif text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
                {children}
            </div>
        </div>
    );
}
