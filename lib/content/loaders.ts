import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import {
  ProfileSchema,
  SystemStatusSchema,
  CertSchema,
  CertsFileSchema,
  TimelineFileSchema,
  ProjectSchema,
  PostMetadataSchema,
  type Profile,
  type SystemStatus,
  type Cert,
  type TimelineEntry,
  type Project,
  type PostMetadata,
} from './schemas';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getProfile(): Profile {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'profile.json'), 'utf-8');
  return ProfileSchema.parse(JSON.parse(file));
}

export function getStatus(): SystemStatus {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'status.json'), 'utf-8');
  return SystemStatusSchema.parse(JSON.parse(file));
}

export function getCerts(): Cert[] {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'certs.json'), 'utf-8');
  return CertsFileSchema.parse(JSON.parse(file)).certs;
}

export function getTimeline(): TimelineEntry[] {
  const file = fs.readFileSync(path.join(CONTENT_DIR, 'timeline.json'), 'utf-8');
  return TimelineFileSchema.parse(JSON.parse(file)).entries;
}

export function getProjects(): Project[] {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.json'));
  const projects = files.map(file => {
    const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
    const project = ProjectSchema.parse(JSON.parse(content));
    if (project.id !== file.replace('.json', '')) {
      throw new Error(`Project ID "${project.id}" does not match filename "${file}"`);
    }
    return project;
  });
  return projects;
}

export function getFeaturedProjects(): Project[] {
  const featured = getProjects().filter((project) => project.featured);

  for (const project of featured) {
    if (project.featuredOrder === undefined) {
      throw new Error(`Featured project "${project.id}" is missing featuredOrder.`);
    }
  }

  const orders = new Set<number>();
  for (const project of featured) {
    if (orders.has(project.featuredOrder!)) {
      throw new Error(`Duplicate featuredOrder "${project.featuredOrder}" found.`);
    }
    orders.add(project.featuredOrder!);
  }

  return featured.sort((a, b) => a.featuredOrder! - b.featuredOrder!);
}

export function getProjectById(id: string): Project | undefined {
  try {
    const file = fs.readFileSync(path.join(CONTENT_DIR, 'projects', `${id}.json`), 'utf-8');
    const project = ProjectSchema.parse(JSON.parse(file));
    if (project.id !== id) {
      throw new Error(`Project ID "${project.id}" does not match filename "${id}.json"`);
    }
    return project;
  } catch (e) {
    return undefined;
  }
}

// Journal Loaders
const JOURNAL_DIR = path.join(CONTENT_DIR, 'journal');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): { slug: string; meta: Omit<PostMetadata, 'slug'>; content: string } {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(JOURNAL_DIR, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const meta = PostMetadataSchema.parse(data);

  return {
    slug: realSlug,
    meta,
    content,
  };
}

export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => {
      const post = getPostBySlug(slug);
      return {
        ...post.meta,
        slug: post.slug,
      } as PostMetadata;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return String(result);
}
