import { NextResponse } from 'next/server';
import { getCurriculum, getAllGlossaryTerms } from '@/lib/content/loader';
import { SearchResult } from '@/components/ui/search/GlobalSearch';

export async function GET() {
    try {
        const curriculum = await getCurriculum();
        const glossaryTerms = await getAllGlossaryTerms();

        const searchIndex: SearchResult[] = [];

        // Build Lesson Index
        curriculum.forEach((area) => {
            if (!area.modules) return;
            area.modules.forEach((mod) => {
                if (!mod.lessons) return;
                mod.lessons.forEach((lesson) => {
                    // @ts-ignore - The description property exists on some items, ignore if not typed
                    const desc = lesson.description || '';

                    searchIndex.push({
                        id: `lesson-${lesson.slug}`,
                        type: 'lesson',
                        title: lesson.title,
                        description: desc,
                        url: `/learn/${area.slug}/${mod.slug}/${lesson.slug}`,
                        area: area.title,
                        module: mod.title
                    });
                });
            });
        });

        // Build Glossary Index
        glossaryTerms.forEach((term: any) => {
            searchIndex.push({
                id: `glossary-${term.id}`,
                type: 'glossary',
                title: term.term,
                description: term.definition,
                url: `/glossario#${term.id}`,
                area: 'Glossario',
                module: ''
            });
        });

        return NextResponse.json({ index: searchIndex });
    } catch (error) {
        console.error('Error generating search index:', error);
        return NextResponse.json({ error: 'Failed to generate search index' }, { status: 500 });
    }
}
