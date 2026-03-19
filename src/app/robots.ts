import { MetadataRoute } from 'next';

export const runtime = 'edge';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-trigger', '/admin-trigger/'],
      },
    ],
    sitemap: 'https://SITEDdg.com/sitemap.xml',
  };
}
