import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal · Wisdom Kinoti',
  description: 'Field notes from the build. Dispatches from active systems, real deployments, and things worth writing down.',
};

const UPCOMING = [
  {
    id: 'otdt-solo-deploy',
    tag: 'Infrastructure',
    title: 'Deploying IBM MAS 9.1 solo on OpenShift ROKS — from zero to EAAAIW 2026 in 3 weeks',
    note: 'How I got a 6-node enterprise cluster running as a CS student with no budget and no team.',
  },
  {
    id: 'wisdomai-arch',
    tag: 'AI systems',
    title: 'Why I chose LangGraph over a single-agent design for WisdomAI',
    note: 'The architectural decision that made 78 test cases possible.',
  },
  {
    id: 'aegis-stateless',
    tag: 'Security tools',
    title: 'Building a stateless Windows forensics tool — the constraints that shaped AEGIS',
    note: 'No install. No registry writes. No external dependencies. Here\'s why that matters.',
  },
];

export default function JournalPage() {
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

      {/* ── Status ──────────────────────────────── */}
      <section>
        <div className="p-5 rounded-2xl border border-border-subtle bg-surface-2 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <p className="label-mono text-amber-600">Not live yet</p>
          </div>
          <p className="text-sm font-mono text-secondary-custom leading-relaxed">
            The first entries are being written. This is a deliberate choice — I want the first
            post to be worth reading, not a placeholder. Estimated: May 2026.
          </p>
        </div>
      </section>

      {/* ── Upcoming entries ─────────────────────── */}
      <section>
        <p className="label-mono mb-5">In the queue</p>
        <div className="space-y-3">
          {UPCOMING.map((entry, i) => (
            <div
              key={entry.id}
              className="p-5 rounded-2xl border border-border-subtle bg-surface-2 opacity-70"
            >
              <div className="flex items-start gap-4">
                <span className="text-[10px] font-mono text-muted-custom tabular-nums mt-0.5 flex-shrink-0">
                  0{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="label-mono mb-1.5">{entry.tag}</p>
                  <p className="text-sm font-mono text-secondary-custom mb-1 leading-snug">{entry.title}</p>
                  <p className="text-xs text-muted-custom font-mono leading-relaxed">{entry.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
