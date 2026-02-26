import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://giurimi.com';

    return {
        rules: {
            userAgent: '*',
            allow: [
                '/',
                '/learn/*',
                '/glossario/*',
                '/mappa',
                '/fonti'
            ],
            disallow: [
                '/dashboard',
                '/profilo',
                '/login',
                '/registrazione',
                '/api/*',
                '/search'
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
