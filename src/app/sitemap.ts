import { MetadataRoute } from 'next';
import { getRepository } from '@/lib/repositories';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://meridiandg.com'; // Update with your actual domain

  const repo = getRepository();
  const schema = await repo.getSchema();

  const propertyUrls: MetadataRoute.Sitemap = schema.properties.map((property) => ({
    url: `${baseUrl}/projects/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...propertyUrls,
  ];
}
