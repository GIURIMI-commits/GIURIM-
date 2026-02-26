import { MetadataRoute } from 'next';
import { getCurriculum } from '@/lib/content/loader';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://giurimi.com';
    const curriculum = await getCurriculum();

    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/mappa`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/fonti`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Add Area Pages
    curriculum.forEach((area) => {
        routes.push({
            url: `${baseUrl}/learn/${area.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        });

        // Add Module/Lesson Pages
        if (area.modules) {
            area.modules.forEach((mod) => {
                if (mod.lessons) {
                    mod.lessons.forEach((lesson) => {
                        routes.push({
                            url: `${baseUrl}/learn/${area.slug}/${mod.slug}/${lesson.slug}`,
                            lastModified: new Date(lesson.last_verified || new Date()),
                            changeFrequency: 'weekly',
                            priority: 0.8,
                        });
                    });
                }
            });
        }
    });

    return routes;
}
