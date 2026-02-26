import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://giurimi.com';

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
