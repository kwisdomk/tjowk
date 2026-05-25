import { MetadataRoute } from 'next';
import { getProjects, getAllPosts } from '@/lib/content/loaders';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects();
  const posts = getAllPosts();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://kwaix.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://kwaix.dev/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://kwaix.dev/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://kwaix.dev/certs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://kwaix.dev/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://kwaix.dev/journal',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .map((project) => ({
      url: `https://kwaix.dev/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.7 : 0.5,
    }));

  const journalRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `https://kwaix.dev/journal/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...journalRoutes];
}
