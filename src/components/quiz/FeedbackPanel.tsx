import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface FeedbackPanelProps {
    isCorrect: boolean;
    message: string;
}

export function FeedbackPanel({ isCorrect, message }: FeedbackPanelProps) {
    return (
        <div className={cn(
            "p-4 rounded-md border flex gap-3",
            isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        )}>
            {isCorrect ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <p className="text-sm">{message}</p>
        </div>
    );
}
