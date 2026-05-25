import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

const journalDirectory = path.join(process.cwd(), 'lib/content/journal');

export type PostMetadata = {
  title: string;
  date: string;
  tag: string;
  slug: string;
  summary: string;
};

const REQUIRED_FIELDS: (keyof Omit<PostMetadata, 'slug'>)[] = ['title', 'date', 'tag', 'summary'];

/**
 * Validate that all required frontmatter fields are present and non-empty.
 * Throws a descriptive error if validation fails.
 */
function validateFrontmatter(data: Record<string, unknown>, slug: string): asserts data is Omit<PostMetadata, 'slug'> {
  const missing = REQUIRED_FIELDS.filter(
    (field) => !(field in data) || typeof data[field] !== 'string' || (data[field] as string).trim() === ''
  );

  if (missing.length > 0) {
    throw new Error(
      `Journal post "${slug}.mdx" is missing required frontmatter: ${missing.join(', ')}. ` +
      `Each post must include: ${REQUIRED_FIELDS.join(', ')}.`
    );
  }
}

export function getPostSlugs() {
  if (!fs.existsSync(journalDirectory)) return [];
  return fs.readdirSync(journalDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(journalDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  validateFrontmatter(data, realSlug);

  return {
    slug: realSlug,
    meta: data as Omit<PostMetadata, 'slug'>,
    content,
  };
}

/**
 * Render markdown content to HTML using unified/remark/rehype.
 * This avoids the React version conflict that next-mdx-remote causes on Next.js 16.
 */
export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return String(result);
}

export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      return {
        ...post.meta,
        slug: post.slug,
      } as PostMetadata;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
