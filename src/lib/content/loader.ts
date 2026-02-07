import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { AreaMeta, ModuleMeta, LessonMeta, Lesson } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getAreas(): Promise<AreaMeta[]> {
    const areasPath = path.join(CONTENT_DIR, 'areas.json');
    if (!fs.existsSync(areasPath)) return [];

    const fileContent = fs.readFileSync(areasPath, 'utf8');
    const areas = JSON.parse(fileContent) as AreaMeta[];
    return areas.sort((a, b) => a.order - b.order);
}

export async function getArea(slug: string): Promise<AreaMeta | null> {
    const areas = await getAreas();
    return areas.find((a) => a.slug === slug) || null;
}

export async function getModules(areaSlug: string): Promise<ModuleMeta[]> {
    const areaPath = path.join(CONTENT_DIR, areaSlug);
    if (!fs.existsSync(areaPath)) return [];

    const entries = fs.readdirSync(areaPath, { withFileTypes: true });
    const modules: ModuleMeta[] = [];

    for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith('mod-')) {
            const metaPath = path.join(areaPath, entry.name, '_module.json');
            if (fs.existsSync(metaPath)) {
                const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as ModuleMeta;
                modules.push(meta);
            }
        }
    }

    return modules.sort((a, b) => a.order - b.order);
}

export async function getLessons(areaSlug: string, moduleSlug: string): Promise<LessonMeta[]> {
    const modulePath = path.join(CONTENT_DIR, areaSlug, moduleSlug);
    if (!fs.existsSync(modulePath)) return [];

    const entries = fs.readdirSync(modulePath);
    const lessons: LessonMeta[] = [];

    for (const file of entries) {
        if (file.endsWith('.mdx')) {
            const filePath = path.join(modulePath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);
            lessons.push(data as LessonMeta);
        }
    }

    return lessons.sort((a, b) => a.order - b.order);
}

export async function getLesson(areaSlug: string, moduleSlug: string, lessonSlug: string): Promise<Lesson | null> {
    const filePath = path.join(CONTENT_DIR, areaSlug, moduleSlug, `${lessonSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        // Try to find the file if exact name isn't known (though slug should match filename usually, but here filename includes title slug)
        // Actually in our scaffold we named files like `lez-1.1.1-perche-esistono-le-regole.mdx`
        // But the slug in frontmatter is `lez-1.1.1`.
        // We need to search by slug or match the filename pattern if simpler.
        // Let's iterate the directory to find the file with the matching slug in frontmatter.
        const modulePath = path.join(CONTENT_DIR, areaSlug, moduleSlug);
        if (!fs.existsSync(modulePath)) return null;

        const entries = fs.readdirSync(modulePath);
        for (const file of entries) {
            if (file.endsWith('.mdx')) {
                const fPath = path.join(modulePath, file);
                const fContent = fs.readFileSync(fPath, 'utf8');
                const { data, content } = matter(fContent);
                if (data.slug === lessonSlug) {
                    return { ...data, content } as Lesson;
                }
            }
        }
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        ...data,
        content,
    } as Lesson;
}

export async function getAllGlossaryTerms() {
    const termsPath = path.join(CONTENT_DIR, 'glossary', 'terms.json');
    if (!fs.existsSync(termsPath)) return [];
    return JSON.parse(fs.readFileSync(termsPath, 'utf8'));
}
