"use client";

import { useState } from 'react';
import { Quiz } from '@/types/content';
import { useQuiz } from '@/hooks/useQuiz';
import { MCQuestion } from './MCQuestion';
import { OpenQuestion } from './OpenQuestion';
import { QuizResults } from './QuizResults';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

interface QuizBlockProps {
    quiz: Quiz;
    lessonSlug: string;
}

export function QuizBlock({ quiz, lessonSlug }: QuizBlockProps) {
    const {
        answers,
        selectAnswer,
        submitQuiz,
        submitted,
        score,
        resetQuiz,
        isSubmitting
    } = useQuiz(lessonSlug, quiz.questions);

    // If passed, show results? Or show results at bottom?
    // Let's show list of questions with feedback intermixed, then score at bottom.

    const allAnswered = quiz.questions
        .filter(q => q.type === 'mcq')
        .every((q, i) => answers[quiz.questions.indexOf(q)] !== undefined);

    return (
        <div className="mt-12 p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl border space-y-8">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-serif font-bold">Mettiti alla prova</h2>
                <p className="text-neutral-500">Verifica i concetti chiave di questa lezione.</p>
            </div>

            <div className="space-y-12">
                {quiz.questions.map((q, index) => {
                    if (q.type === 'mcq') {
                        return (
                            <MCQuestion
                                key={index}
                                prompt={q.prompt}
                                choices={q.choices || []}
                                correctIndex={q.correctIndex || 0}
                                feedback={q.feedback}
                                onSelect={(choiceIndex) => selectAnswer(index, choiceIndex)}
                                selectedIndex={answers[index]}
                                submitted={submitted}
                            />
                        );
                    } else if (q.type === 'open') {
                        return (
                            <OpenQuestion
                                key={index}
                                prompt={q.prompt}
                                expected_points={q.expected_points}
                            />
                        );
                    }
                    return null;
                })}
            </div>

            {!submitted ? (
                <div className="flex justify-end pt-4 border-t">
                    <Button
                        onClick={submitQuiz}
                        disabled={!allAnswered || isSubmitting}
                        size="lg"
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Verifica Risposte
                    </Button>
                </div>
            ) : (
                <div className="pt-4 border-t">
                    <QuizResults score={score} onRetry={resetQuiz} />
                </div>
            )}
        </div>
    );
}
