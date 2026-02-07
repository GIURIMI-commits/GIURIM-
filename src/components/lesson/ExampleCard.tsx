import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExampleCardProps {
    type: 'positive' | 'negative';
    title: string;
    children: React.ReactNode;
}

export function ExampleCard({ type, title, children }: ExampleCardProps) {
    const isPositive = type === 'positive';

    return (
        <div
            className={cn(
                "my-6 rounded-lg border p-1 shadow-sm",
                isPositive
                    ? "bg-success/5 border-success/20"
                    : "bg-error/5 border-error/20"
            )}
        >
            <div className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-t-md font-semibold text-sm",
                isPositive ? "text-success-foreground bg-success" : "text-error-foreground bg-error"
            )}>
                {isPositive ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {title}
            </div>
            <div className="p-4 bg-white dark:bg-neutral-950 rounded-b-md">
                {children}
            </div>
        </div>
    );
}
