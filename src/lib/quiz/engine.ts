import { QuizAttempt } from '@/types/user';
import { QuizQuestion } from '@/types/content';

export function calculateQuizScore(
    questions: QuizQuestion[],
    answers: { [key: number]: number } // questionIndex -> selectedChoiceIndex
): number {
    const mcqQuestions = questions.filter((q) => q.type === 'mcq');
    if (mcqQuestions.length === 0) return 0;

    let correctCount = 0;

    mcqQuestions.forEach((q, index) => {
        // Find the original index of this question in the full array to get the answer
        const originalIndex = questions.indexOf(q);
        const selected = answers[originalIndex];
        if (selected !== undefined && selected === q.correctIndex) {
            correctCount++;
        }
    });

    return Math.round((correctCount / mcqQuestions.length) * 100);
}

export function isQuizPassed(score: number): boolean {
    return score >= 60; // 60% threshold
}
