import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface MCQuestionProps {
    prompt: string;
    choices: string[];
    correctIndex: number;
    feedback?: { [key: number]: string };
    onSelect: (index: number) => void;
    selectedIndex?: number;
    submitted: boolean;
}

export function MCQuestion({
    prompt,
    choices,
    correctIndex,
    feedback,
    onSelect,
    selectedIndex,
    submitted
}: MCQuestionProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">{prompt}</h3>
            <div className="space-y-2">
                {choices.map((choice, index) => {
                    const isSelected = selectedIndex === index;
                    const isCorrect = index === correctIndex;

                    let variant = "outline";
                    if (submitted) {
                        if (isCorrect) variant = "success"; // we need to add success variant to button or style manually
                        else if (isSelected && !isCorrect) variant = "destructive";
                    } else {
                        if (isSelected) variant = "default";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !submitted && onSelect(index)}
                            disabled={submitted}
                            className={cn(
                                "w-full text-left p-4 rounded-md border transition-all flex items-center justify-between",
                                submitted && isCorrect && "bg-green-100 border-green-500 text-green-900 dark:bg-green-900/30 dark:text-green-100",
                                submitted && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:text-red-100",
                                !submitted && isSelected && "ring-2 ring-primary border-primary bg-primary/5",
                                !submitted && !isSelected && "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            )}
                        >
                            <span>{choice}</span>
                            {submitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                            {submitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                        </button>
                    );
                })}
            </div>

            {submitted && selectedIndex !== undefined && feedback && feedback[selectedIndex] && (
                <div className={cn(
                    "p-4 rounded-md text-sm mt-4",
                    selectedIndex === correctIndex ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200" : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
                )}>
                    <strong>Feedback:</strong> {feedback[selectedIndex]}
                </div>
            )}
        </div>
    );
}
