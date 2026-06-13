import type { Metadata } from 'next';
import { getFeaturedProjects, getTimeline } from '@/lib/content/loaders';
import { FeaturedCard } from '@/components/projects/FeaturedCard';
import { HorizontalTimeline } from '@/components/projects/HorizontalTimeline';

export const metadata: Metadata = {
  title: "Wisdom's Projects",
  description: 'The full build history — every project, experiment, and milestone from 2024 to now.',
};



export default function ProjectsPage() {
  const featuredProjects = getFeaturedProjects();
  const timeline = getTimeline();
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">Workloads</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Projects, experiments, and field work.
        </h1>
        <p className="mt-3 text-muted-custom font-mono text-sm max-w-xl">
          Chronological record of projects, experiments, and milestones. Featured work highlights
          public-safe systems and learning tracks that best represent my current direction. Some
          private, client, internship, or sensitive work is intentionally summarized only.
        </p>
      </header>

      {/* ── Featured ────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <p className="label-mono">Featured work</p>
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="label-mono">{featuredProjects.length} projects</span>
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
        <div className="w-full">
          <HorizontalTimeline timeline={timeline} />
        </div>
      </section>

    </div>
  );
}
