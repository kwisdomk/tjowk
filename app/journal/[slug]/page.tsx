import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs, renderMarkdown } from '@/lib/content/loaders';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: `${post.meta.title} · Journal`,
      description: post.meta.summary,
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const html = await renderMarkdown(post.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link 
        href="/journal"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-custom hover:text-emerald transition-colors mb-12"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Dispatches
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2.5 py-1 rounded-md bg-emerald/10 text-emerald text-xs font-mono border border-emerald/20">
            {post.meta.tag}
          </span>
          <time className="text-xs font-mono text-muted-custom">
            {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary leading-tight font-mono-custom mb-6">
          {post.meta.title}
        </h1>
        <p className="text-sm font-mono text-secondary-custom leading-relaxed">
          {post.meta.summary}
        </p>
      </header>

      <div className="w-full h-px bg-border-subtle mb-12" />

      <article
        className="journal-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
