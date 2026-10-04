import { notFound } from 'next/navigation';
import { getUnknowns } from '@/lib/content/loaders';
import Link from 'next/link';
import { ShieldAlert, Terminal, CheckCircle2, Circle, AlertTriangle, ArrowLeft, GitFork, Cpu } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'KWAIX // R&D Incubator (Dev Only)',
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnknownsPage() {
  // CRITICAL GUARD: In production (Vercel / live deployment), kill the page instantly
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const unknowns = getUnknowns();

  return (
    <div className="site-shell py-20 space-y-16">
      {/* ── Top Navigation & Warning Banner ──────── */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-custom hover:text-emerald transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Public Workloads
        </Link>

        <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                  [DEV HUD // UNKNOWNS INCUBATOR]
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                  LOCAL WORKSTATION ONLY (ATHENA)
                </span>
              </div>
              <p className="text-xs font-mono text-secondary-custom dark:text-zinc-300 leading-relaxed">
                Isolated development staging dashboard. Contains unreleased workloads, quarantined projects, and candidate specs. 
                Protected by server-side runtime kill-switch (returns hard 404 in production).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Header ──────────────────────────────── */}
      <header>
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="w-4 h-4 text-emerald" />
          <p className="label-mono text-emerald">Incubation Diagnostics & R&D HUD</p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-mono-custom mb-4">
          The Unknowns Layer.
        </h1>
        <p className="text-sm font-mono text-muted-custom dark:text-zinc-400 max-w-2xl leading-relaxed">
          Staging buffer for ideas, prototypes, and unverified builds. Workloads stay here until they satisfy the 5-point portfolio-ready threshold.
        </p>
      </header>

      {/* ── Incubating Workloads List ────────────── */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <p className="label-mono">Incubating Workloads</p>
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="label-mono">{unknowns.length} items in quarantine/R&D</span>
        </div>

        <div className="space-y-8">
          {unknowns.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border-subtle bg-surface/60 backdrop-blur-xl p-6 md:p-8 space-y-6 transition-all duration-300 hover:border-border"
            >
              {/* Card Header Bar */}
              <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-border-subtle">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-mono text-emerald uppercase tracking-wider font-semibold">
                      [INCUBATING] // {item.codename}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border border-border-subtle bg-surface-2 text-muted-custom">
                      Phase: {item.phase}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-mono-custom text-primary">
                    {item.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase border ${
                      item.status === 'HOLD'
                        ? 'border-amber-500/30 text-amber-500 bg-amber-500/10'
                        : item.status === 'EXPLORING'
                        ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                        : 'border-zinc-500/30 text-zinc-400 bg-zinc-500/10'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    STATUS: {item.status}
                  </span>
                </div>
              </div>

              {/* Concept */}
              <div>
                <p className="text-xs font-mono text-muted-custom uppercase tracking-wider mb-1.5">Concept</p>
                <p className="text-sm font-mono text-secondary-custom dark:text-zinc-200 leading-relaxed">
                  {item.concept}
                </p>
              </div>

              {/* Deficit / Quarantine Reason */}
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 dark:bg-red-950/10 space-y-2">
                <div className="flex items-center gap-2 text-red-500 text-xs font-mono font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  [!] DEFICIT // WHY IT IS IN QUARANTINE:
                </div>
                <ul className="space-y-1 pl-5">
                  {item.deficit.map((def, idx) => (
                    <li key={idx} className="text-xs font-mono text-red-400/90 list-disc leading-relaxed">
                      {def}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Graduation Checklist */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10 space-y-3">
                <p className="text-xs font-mono font-semibold text-emerald tracking-wide">
                  [&gt;] GRADUATION CHECKLIST (Required before moving to public /projects):
                </p>
                <div className="space-y-1.5">
                  {item.graduationChecklist.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-secondary-custom dark:text-zinc-300">
                      <Circle className="w-3.5 h-3.5 text-muted-custom flex-shrink-0 mt-0.5 opacity-60" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blueprint / Raw Specs */}
              <div>
                <p className="text-xs font-mono text-muted-custom uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald" />
                  Raw Spec Notes & Architecture Blueprint:
                </p>
                <div className="p-4 rounded-xl border border-border-subtle bg-surface-2/60 font-mono text-xs text-muted-custom dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                  {item.blueprint}
                </div>
              </div>

              {/* Tech Stack & Links */}
              <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-border-subtle text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md border border-border-subtle bg-surface-2 text-[11px] text-secondary-custom"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {item.links?.repo && (
                  <Link
                    href={item.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-custom hover:text-emerald transition-colors"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    Target Repository
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
