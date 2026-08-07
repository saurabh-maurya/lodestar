import type { MetadataRoute } from 'next';

const routes = [
  { path: '', priority: 1 },
  { path: '/programs', priority: 0.9 },
  { path: '/for-schools', priority: 0.9 },
  { path: '/free-assessment', priority: 1 },
  { path: '/about', priority: 0.7 },
  { path: '/testimonials', priority: 0.7 },
  { path: '/resources', priority: 0.7 },
  { path: '/legal/privacy-policy', priority: 0.3 },
  { path: '/legal/terms-conditions', priority: 0.3 },
  { path: '/legal/refund-policy', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lodestar.guru';
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
