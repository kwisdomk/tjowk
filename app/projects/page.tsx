import type { Metadata } from 'next';
import { projects } from '@/lib/content/projects';
import { FeaturedCard } from '@/components/projects/FeaturedCard';
import { TimelineSpine } from '@/components/projects/TimelineSpine';

export const metadata: Metadata = {
  title: 'Operations Log',
  description: 'The full build history — every project, experiment, and milestone from 2024 to now.',
};

const featuredProjects = projects.filter((p) => p.featured);

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">Operations log</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Everything I&apos;ve built.
        </h1>
        <p className="mt-3 text-muted-custom font-mono text-sm max-w-xl">
          Chronological record of every project, experiment, and milestone. The featured section covers
          systems that reached production quality. The timeline covers everything else.
        </p>
      </header>

      {/* ── Featured ────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <p className="label-mono">Featured systems</p>
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="label-mono">{featuredProjects.length} systems</span>
        </div>
        <div className="space-y-6">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── Timeline ────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <p className="label-mono">Full timeline</p>
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="label-mono text-muted-custom">2024 → now</span>
        </div>
        <div className="max-w-2xl">
          <TimelineSpine />
        </div>
      </section>

    </div>
  );
}
