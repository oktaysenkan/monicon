import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const revalidate = false;

const getBaseUrl = () => {
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}`;

    return 'http://localhost:3000';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = (path: string): string => new URL(path, getBaseUrl()).toString();

    const docsPagesSitemap: MetadataRoute.Sitemap = await Promise.all(
        source.getPages().map(async (page) => {
            return {
                url: url(page.url),
                changeFrequency: 'weekly',
                priority: 0.5,
            }
        })
    );

    return [
        {
            url: url('/'),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: url('/docs'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...docsPagesSitemap,
    ];
}