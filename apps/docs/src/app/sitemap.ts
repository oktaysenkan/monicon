import type { MetadataRoute } from 'next';
import { getGithubLastEdit } from 'fumadocs-core/content/github';
import { source } from '@/lib/source';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";

    const url = (path: string): string => new URL(path, baseUrl).toString();

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