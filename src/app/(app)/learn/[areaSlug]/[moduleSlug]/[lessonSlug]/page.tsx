import { getLesson } from '@/lib/content/loader';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        areaSlug: string;
        moduleSlug: string;
        lessonSlug: string;
    };
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

    return <LessonPlayer lesson={lesson} />;
}
