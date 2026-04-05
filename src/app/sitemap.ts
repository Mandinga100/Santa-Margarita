import { MetadataRoute } from 'next';
import { planesData } from '@/data/planes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://funeraria-sm.web.app';
    const lastModified = new Date();

    const planesRoutes = planesData.map(plan => `/planes/${plan.id}`);

    const baseRoutes = [
        '',
        '/planes',
        '/servicios',
        '/memoriales',
        '/nosotros',
        '/prevision',
        '/contacto',
        '/cotizacion',
        '/blog',
    ];

    const routes = [...baseRoutes, ...planesRoutes].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...routes];
}
