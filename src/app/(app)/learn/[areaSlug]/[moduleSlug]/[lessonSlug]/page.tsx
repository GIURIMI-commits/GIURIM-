import { getCurriculum, getLesson } from '@/lib/content/loader';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
    params: {
        areaSlug: string;
        moduleSlug: string;
        lessonSlug: string;
    };
}

// Generate static build paths (SSG) for all possible lessons
export async function generateStaticParams() {
    const curriculum = await getCurriculum();
    const params: { areaSlug: string; moduleSlug: string; lessonSlug: string; }[] = [];

    curriculum.forEach(area => {
        if (!area.modules) return;
        area.modules.forEach(mod => {
            if (!mod.lessons) return;
            mod.lessons.forEach(lesson => {
                params.push({
                    areaSlug: area.slug,
                    moduleSlug: mod.slug,
                    lessonSlug: lesson.slug,
                });
            });
        });
    });

    return params;
}

// Generate Dynamic SEO tags based on MDX Frontmatter
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { areaSlug, moduleSlug, lessonSlug } = await params;
    const lesson = await getLesson(areaSlug, moduleSlug, lessonSlug);

    if (!lesson) {
        return {
            title: 'Lezione Non Trovata | GIURIMÌ',
        }
    }

    return {
        title: `${lesson.title} | GIURIMÌ`,
        description: `Studia "${lesson.title}" del modulo ${moduleSlug.replace('mod-', '')}. Spiegazione chiara e strutturata di Diritto su GIURIMÌ.`,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://giurimi.it'}/learn/${areaSlug}/${moduleSlug}/${lessonSlug}`
        }
    }
}

// Next.js 15+ params are async, but checking package.json version 14/15. 
// "next": "16.1.6" -> Next 15+ requires awaiting params
export default async function LessonPage({ params }: PageProps) {
    // Await params because in newer Next.js versions params is a Promise
    const { areaSlug, moduleSlug, lessonSlug } = await params;

    const lesson = await getLesson(areaSlug, moduleSlug, lessonSlug);

    if (!lesson) {
        notFound();
    }

    // Add JSON-LD directly to the page markup
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'EducationalArticle',
        headline: lesson.title,
        description: `Studia "${lesson.title}" del modulo ${moduleSlug.replace('mod-', '')}. Spiegazione chiara e strutturata di Diritto su GIURIMÌ.`,
        author: {
            '@type': 'Organization',
            name: 'GIURIMÌ',
            url: process.env.NEXT_PUBLIC_APP_URL || 'https://giurimi.it'
        },
        publisher: {
            '@type': 'Organization',
            name: 'GIURIMÌ',
            url: process.env.NEXT_PUBLIC_APP_URL || 'https://giurimi.it'
        },
        dateModified: lesson.last_verified ? new Date(lesson.last_verified).toISOString() : new Date().toISOString(),
        educationalLevel: 'Beginner',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LessonPlayer lesson={lesson} />
        </>
    );
}
