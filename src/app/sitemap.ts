import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://funeraria-sm.web.app';
    const lastModified = new Date();

    const routes = [
        '',
        '/planes',
        '/planes/margarita',
        '/planes/acacia',
        '/planes/rauli',
        '/servicios',
        '/memoriales',
        '/nosotros',
        '/prevision',
        '/contacto',
        '/cotizacion',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...routes];
}
