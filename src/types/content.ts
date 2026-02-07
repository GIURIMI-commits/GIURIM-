export interface AreaMeta {
    slug: string;
    title: string;
    description: string;
    order: number;
    icon?: string;
    modules?: ModuleMeta[];
}

export interface ModuleMeta {
    slug: string;
    title: string;
    description: string;
    order: number;
    lessons?: LessonMeta[];
}

export interface LessonMeta {
    slug: string;
    title: string;
    area: string;
    module: string;
    order: number;
    duration_minutes: number;
    prerequisites?: string[];
    next_lesson?: string | null;
    prev_lesson?: string | null;
    last_verified?: string;
    verified_by?: string;
    disclaimer_level?: 'standard' | 'high';
    source_refs?: { label: string; url: string }[];
    glossary_terms?: string[];
    quiz?: Quiz;
}

export interface Lesson extends LessonMeta {
    content: string; // MDX content
}

export interface Quiz {
    questions: QuizQuestion[];
}

export type QuestionType = 'mcq' | 'open';

export interface QuizQuestion {
    type: QuestionType;
    prompt: string;
    choices?: string[]; // for mcq
    correctIndex?: number; // for mcq
    feedback?: { [key: number]: string }; // for mcq
    expected_points?: string[]; // for open
}

export interface GlossaryTerm {
    id: string;
    term: string;
    definition_simple: string;
    definition_technical?: string;
    examples?: string[];
    area?: string;
    tag?: string;
    sources?: Array<{
        label: string;
        href: string;
        kind?: "normattiva" | "gazzetta" | "cortecost" | "parlamento" | "europa" | "altro";
    }>;
}
