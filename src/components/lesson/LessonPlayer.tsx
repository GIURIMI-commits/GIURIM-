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
import { ConceptBlock } from './ConceptBlock';
import { FlowBlock } from './FlowBlock';
import { Row, Col, Highlight, CardBlock, Steps, Step } from './LayoutBlocks';
import { Objective, Compare } from './NewBlocks';
import { VideoEmbed } from './VideoEmbed';

const components = {
    // Custom blocks
    // Standard Components
    HookBlock,
    TechnicalBlock,
    ExampleCard,
    GlossaryTerm,
    ConceptBlock,
    FlowBlock,
    Row,
    Col,
    Highlight,
    CardBlock,
    Steps,
    Step,
    VideoEmbed,

    // Aliases & New Shorthands (User Code Support)
    Hook: HookBlock,
    Technical: TechnicalBlock,
    Example: ExampleCard,
    Concept: ConceptBlock,
    Resources: (props: any) => <components.ResourceFooter {...props} />, // Map Sources/Resources
    Sources: (props: any) => <components.ResourceFooter {...props} />,

    // New Logic
    Objective,
    Compare,

    // Adapters
    Flow: (props: any) => {
        // Support items={["A", "B"]} format
        if (props.items && Array.isArray(props.items)) {
            return <FlowBlock>{props.items.join(' -> ')}</FlowBlock>;
        }
        return <FlowBlock {...props} />;
    },

    Quiz: () => null, // Placeholder to prevent crash if user writes <Quiz /> in MDX manually
    QuizBlock: () => null, // Prevents crash if <QuizBlock /> is in MDX (rendered at bottom via props)

    ResourceFooter: (props: any) => (
        <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
            {props.children ? (
                // Use user provided children if available (rendered MDX)
                <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                    {props.children}
                </div>
            ) : (
                // Fallback / Default if empty
                <>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-200">Fonti e Risorse</h4>
                    <p>Riferimenti normativi: Normattiva.it</p>
                    <p className="mt-4 text-xs">DISCLAIMER: Questo contenuto è a scopo puramente educativo...</p>
                </>
            )}
        </div>
    )
};

interface LessonPlayerProps {
    lesson: Lesson;
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            <article className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 md:p-12">
                <LessonHeader lesson={lesson} />

                <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-lg prose-p:leading-relaxed prose-li:text-lg">
                    <MDXRemote source={lesson.content} components={components} />
                </div>

                {lesson.quiz && (
                    <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                        <QuizBlock quiz={lesson.quiz} lessonSlug={lesson.slug} />
                    </div>
                )}

                <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                    <LessonNav
                        prevSlug={lesson.prev_lesson}
                        nextSlug={lesson.next_lesson}
                        areaSlug={lesson.area}
                        moduleSlug={lesson.module}
                    />
                </div>
            </article>
        </div>
    );
}
