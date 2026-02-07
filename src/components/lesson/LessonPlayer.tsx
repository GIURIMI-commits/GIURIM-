import { MDXRemote } from 'next-mdx-remote/rsc';
import { Lesson } from '@/types/content';
import { LessonHeader } from './LessonHeader';
import { LessonNav } from './LessonNav';
import { HookBlock } from './HookBlock';
import { TechnicalBlock } from './TechnicalBlock';
import { ExampleCard } from './ExampleCard';
import { GlossaryTerm } from '@/components/glossary/GlossaryTooltip';
import { QuizBlock } from '@/components/quiz/QuizBlock';
import { Card } from '@/components/ui/Card'; // general use

const components = {
    HookBlock,
    TechnicalBlock,
    ExampleCard,
    GlossaryTerm,
    // Diagram: (props) => <div>Diagram placeholder</div>,
    // Warning: (props) => <div className="bg-yellow-100 p-4 rounded text-yellow-900">Warning: {props.children}</div>,
    ResourceFooter: () => (
        <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
            <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-200">Fonti e Risorse</h4>
            <p>Riferimenti normativi: Normattiva.it</p>
            <p className="mt-4 text-xs">DISCLAIMER: Questo contenuto è a scopo puramente educativo...</p>
        </div>
    )
};

interface LessonPlayerProps {
    lesson: Lesson;
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <LessonHeader lesson={lesson} />

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-lg prose-p:leading-relaxed">
                <MDXRemote source={lesson.content} components={components} />
            </div>

            {lesson.quiz && (
                <QuizBlock quiz={lesson.quiz} lessonSlug={lesson.slug} />
            )}

            <LessonNav
                prevSlug={lesson.prev_lesson}
                nextSlug={lesson.next_lesson}
                areaSlug={lesson.area}
                moduleSlug={lesson.module}
            />
        </article>
    );
}
