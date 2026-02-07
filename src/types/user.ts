export type UserRole =
    | 'student'
    | 'citizen'
    | 'high_school'
    | 'competitor'
    | 'professional'
    | 'creator'
    | 'teacher';

export interface UserProfile {
    id: string;
    display_name: string | null;
    role: UserRole | null;
    onboarding_completed: boolean;
    preferred_path: string[] | null;
    streak_current: number;
    streak_best: number;
    last_active_at: string | null;
    created_at: string;
    updated_at: string;
}

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface LessonProgress {
    id: string;
    user_id: string;
    lesson_slug: string;
    status: LessonStatus;
    completed_at: string | null;
    time_spent_seconds: number;
}

export interface QuizAttempt {
    id?: string;
    user_id: string;
    lesson_slug: string;
    score: number;
    answers: { [key: number]: number }; // questionIndex -> selectedChoiceIndex
    created_at?: string;
}
