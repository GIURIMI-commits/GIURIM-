import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { isQuizPassed } from '@/lib/quiz/engine';
import { RefreshCw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface QuizResultsProps {
    score: number;
    onRetry: () => void;
    nextLessonSlug?: string | null;
}

export function QuizResults({ score, onRetry, nextLessonSlug }: QuizResultsProps) {
    const passed = isQuizPassed(score);

    return (
        <div className="text-center space-y-6 py-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif">
                    {passed ? "Ottimo lavoro! 🎉" : "Ripassa e riprova 💪"}
                </h3>
                <p className="text-neutral-500">
                    Hai risposto correttamente al {score}% delle domande.
                </p>
            </div>

            <div className="max-w-xs mx-auto">
                <ProgressBar value={score} className={passed ? "text-green-600" : "text-amber-500"} />
            </div>

            <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={onRetry} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Riprova
                </Button>

                {/* Note: nextLessonSlug isn't fully linked yet, assumes standard routing */}
                {passed && nextLessonSlug && (
                    <Link href={`/learn/.../${nextLessonSlug}`}>
                        {/* TODO: FIX URL GENERATION logic needed here or passed down */}
                        <Button className="gap-2">
                            Prossima Lezione
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
