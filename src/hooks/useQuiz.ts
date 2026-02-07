"use client";

import { useState } from 'react';
import { QuizQuestion } from '@/types/content';
import { calculateQuizScore } from '@/lib/quiz/engine';
import { createClient } from '@/lib/supabase/client';

export function useQuiz(lessonSlug: string, questions: QuizQuestion[]) {
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const supabase = createClient();

    const selectAnswer = (questionIndex: number, choiceIndex: number) => {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [questionIndex]: choiceIndex }));
    };

    const submitQuiz = async () => {
        setIsSubmitting(true);
        const finalScore = calculateQuizScore(questions, answers);
        setScore(finalScore);
        setSubmitted(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const attempt = {
                user_id: user.id,
                lesson_slug: lessonSlug,
                score: finalScore,
                answers: answers,
            };
            await supabase.from('quiz_attempts').insert(attempt);
        }
        setIsSubmitting(false);
    };

    const resetQuiz = () => {
        setAnswers({});
        setSubmitted(false);
        setScore(0);
    };

    return {
        answers,
        selectAnswer,
        submitQuiz,
        submitted,
        score,
        resetQuiz,
        isSubmitting
    };
}
