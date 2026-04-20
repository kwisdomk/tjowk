import type { Metadata } from 'next';
import { certs } from '@/lib/content/certs';
import { CredentialCard } from '@/components/certs/CredentialCard';

export const metadata: Metadata = {
  title: 'Credentials',
  description: 'Acquired capabilities — certifications complete, in progress, and planned.',
};

const complete   = certs.filter((c) => c.status === 'complete');
const inProgress = certs.filter((c) => c.status === 'in-progress');
const planned    = certs.filter((c) => c.status === 'planned');

export default function CertsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">Acquired capabilities</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Credentials.
        </h1>
        <p className="mt-3 text-muted-custom font-mono text-sm">
          Not a badge wall. A capability register. Honest about what&apos;s done and what&apos;s in progress.
        </p>
      </header>

      {/* ── Complete ────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-5">
          <p className="label-mono text-emerald-600">Complete</p>
          <div className="flex-1 h-px bg-emerald-500/10" />
          <span className="label-mono">{complete.length}</span>
        </div>
        <div className="space-y-2">
          {complete.map((cert, i) => (
            <CredentialCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </section>

      {/* ── In Progress ─────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-5">
          <p className="label-mono text-amber-600">In progress</p>
          <div className="flex-1 h-px bg-amber-500/10" />
          <span className="label-mono">{inProgress.length}</span>
        </div>
        <div className="space-y-2">
          {inProgress.map((cert, i) => (
            <CredentialCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </section>

      {/* ── Planned ─────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-5">
          <p className="label-mono">Planned</p>
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="label-mono">{planned.length}</span>
        </div>
        <div className="space-y-2">
          {planned.map((cert, i) => (
            <CredentialCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </section>

    </div>
  );
}
