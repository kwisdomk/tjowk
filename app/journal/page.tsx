import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal · Wisdom Kinoti',
  description: 'Field notes from the build. Dispatches from active systems, real deployments, and things worth writing down.',
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">Journal</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
          Dispatches.
        </h1>
        <p className="text-sm font-mono text-secondary-custom max-w-lg leading-relaxed">
          Field notes from the build. Not tutorials. Not hot takes. Specific technical decisions,
          real deployment stories, and things that took longer to figure out than they should have.
        </p>
      </header>

      {/* ── Entries ─────────────────────── */}
      <section>
        <p className="label-mono mb-5">Terminal output</p>
        <div className="space-y-3">
          {posts.map((entry, i) => (
            <Link key={entry.slug} href={`/journal/${entry.slug}`} className="block group">
              <div
                className="p-5 rounded-2xl border border-border-subtle bg-surface-2 transition-all duration-300
                            hover:border-border-hover hover:bg-surface"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-emerald tabular-nums mt-0.5 flex-shrink-0">
                    0{posts.length - i}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="label-mono mb-1.5">{entry.tag}</p>
                    <h2 className="text-base font-mono-custom text-primary mb-1 leading-snug group-hover:text-emerald transition-colors">{entry.title}</h2>
                    <p className="text-xs text-muted-custom font-mono leading-relaxed">{entry.summary}</p>
                    <p className="text-[10px] text-muted-custom font-mono mt-3">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface-2">
              <p className="text-sm font-mono text-secondary-custom leading-relaxed">
                No entries found.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
