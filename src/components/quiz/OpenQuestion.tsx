import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface OpenQuestionProps {
    prompt: string;
    expected_points?: string[];
}

export function OpenQuestion({ prompt, expected_points }: OpenQuestionProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">{prompt}</h3>
            <div className="relative">
                <textarea
                    className="w-full min-h-[100px] p-3 rounded-md border bg-transparent resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Scrivi la tua risposta..."
                />
            </div>

            {!showAnswer ? (
                <Button variant="secondary" onClick={() => setShowAnswer(true)}>
                    Confronta con la soluzione
                </Button>
            ) : (
                <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-md border space-y-2 animate-in fade-in slide-in-from-top-2">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-500">Punti chiave attesi</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {expected_points?.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
