import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Lesson } from '@/types/content';
import { LessonHeader } from './LessonHeader';
import { LessonNav } from './LessonNav';
import { HookBlock } from './HookBlock';
import { TechnicalBlock } from './TechnicalBlock';
import { ExampleCard } from './ExampleCard';
import { GlossaryTerm } from '@/components/glossary/GlossaryTooltip';
import { QuizBlock as QuizBlockComponent } from '@/components/quiz/QuizBlock';
import { Card } from '@/components/ui/Card'; // general use
import { ConceptBlock } from './ConceptBlock';
import { FlowBlock } from './FlowBlock';
import { Row, Col, Highlight, CardBlock, Steps, Step } from './LayoutBlocks';
import { Objective, Compare, SectionTitle } from './NewBlocks';
import { VideoEmbed } from './VideoEmbed';
import { AnimatedObbligazione } from './interactive/AnimatedObbligazione';
import { AnimatedTimeline } from './interactive/AnimatedTimeline';
import { AnimatedModiEstinzione } from './interactive/AnimatedModiEstinzione';
import { AnimatedCalcoloDanno } from './interactive/AnimatedCalcoloDanno';
import { AnimatedProprietaPossesso } from './interactive/AnimatedProprietaPossesso';
import { AnimatedFormeFamiliari } from './interactive/AnimatedFormeFamiliari';

interface LessonPlayerProps {
    lesson: Lesson;
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
    const components = {
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

        // Interactive Advanced Blocks
        AnimatedObbligazione,
        AnimatedTimeline,
        AnimatedModiEstinzione,
        AnimatedCalcoloDanno,
        AnimatedProprietaPossesso,
        AnimatedFormeFamiliari,

        // Aliases & New Shorthands (User Code Support)
        Hook: HookBlock,
        Technical: TechnicalBlock,
        Example: ExampleCard,
        Concept: ConceptBlock,
        Resources: (props: any) => <components.ResourceFooter {...props} />,
        Sources: (props: any) => <components.ResourceFooter {...props} />,

        // New Logic
        Objective,
        Compare,
        SectionTitle,

        // Adapters
        Flow: (props: any) => {
            if (props.items && Array.isArray(props.items)) {
                return <FlowBlock>{props.items.join(' -> ')}</FlowBlock>;
            }
            return <FlowBlock {...props} />;
        },

        // Render the real Quiz directly where the user places `<QuizBlock />` in the MDX
        Quiz: () => lesson.quiz ? <QuizBlockComponent quiz={lesson.quiz} lessonSlug={lesson.slug} /> : null,
        QuizBlock: () => lesson.quiz ? <QuizBlockComponent quiz={lesson.quiz} lessonSlug={lesson.slug} /> : null,

        ResourceFooter: (props: any) => (
            <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
                {props.children ? (
                    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                        {props.children}
                    </div>
                ) : (
                    <>
                        <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-200">Fonti e Risorse</h4>
                        <p>Riferimenti normativi: Normattiva.it</p>
                        <p className="mt-4 text-xs">DISCLAIMER: Questo contenuto è a scopo puramente educativo...</p>
                    </>
                )}
            </div>
        )
    };

    const hasQuizInMDX = lesson.content.includes('<Quiz') || lesson.content.includes('<QuizBlock');

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            <article className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 md:p-12">
                <LessonHeader lesson={lesson} />

                <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-lg prose-p:leading-relaxed prose-li:text-lg">
                    <MDXRemote source={lesson.content} components={components} />
                </div>

                {/* Auto-append quiz if they didn't manually use the <QuizBlock /> tag */}
                {lesson.quiz && !hasQuizInMDX && (
                    <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                        <QuizBlockComponent quiz={lesson.quiz} lessonSlug={lesson.slug} />
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

            {/* Global Open Source Disclaimer (Beta) & CTA Collaborazione */}
            <div className="mt-8 p-5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row items-start gap-4 shadow-sm group hover:shadow-md transition-shadow">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2.5 rounded-xl flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-400 text-sm">
                        Progetto Educativo Open Source (Beta)
                    </h4>
                    <p className="text-sm text-amber-800/80 dark:text-amber-500/80 mt-1 leading-relaxed">
                        Giurimì è un ecosistema collaborativo in costante aggiornamento. I contenuti, seppur verificati, potrebbero contenere imprecisioni o semplificazioni e non costituiscono in alcun modo parere o consulenza legale istituzionale.
                    </p>
                    <Link href="/chi-siamo#collabora" className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 dark:text-amber-500 mt-3 group-hover:underline">
                        Sei uno studente o un professionista? Aiutaci a migliorare la piattaforma <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
