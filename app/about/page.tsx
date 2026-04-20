import type { Metadata } from 'next';
import { profile } from '@/lib/content/profile';

export const metadata: Metadata = {
  title: 'The Operator',
  description: 'The person behind the work. Context, not biography.',
};

const CAREER_ARC = [
  {
    phase: 'Phase 1',
    label: 'Technical Depth',
    timing: 'Now',
    active: true,
    items: [
      'ISC2 CC — Certified in Cybersecurity',
      'CompTIA Security+',
      'CEH — Certified Ethical Hacker',
      'RHSA I / RHSA II',
      'First professional security analyst roles',
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Leadership / GRC',
    timing: '2027–2029',
    active: false,
    items: [
      'OSCP',
      'CySA+ · CASP+',
      'Senior analyst / pen tester',
      'Team lead responsibility',
      'ISO 27001 / GRC advisory',
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Executive',
    timing: '~30–33',
    active: false,
    items: [
      'CISSP',
      'CISM',
      'CISO or security firm founder',
      'East African security infrastructure',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">THE_OPERATOR</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
          {profile.name}
        </h1>
        <p className="text-xl font-mono text-emerald mb-6">{profile.alias}</p>
        <p className="text-secondary-custom leading-relaxed max-w-2xl">
          {profile.philosophy}
        </p>
      </header>

      {/* ── Background ──────────────────────────── */}
      <section className="space-y-5">
        <p className="label-mono">BACKGROUND</p>
        <div className="space-y-4 text-sm text-secondary-custom leading-relaxed max-w-2xl">
          <p>
            Started in infrastructure, not code. Kenya Power. RK Shah. Close the Gap. Understanding
            how systems actually run before learning to build them.
          </p>
          <p>
            The shift happened naturally — operations to systems to intelligence. The same curiosity
            that drove understanding physical infrastructure now drives understanding the software
            that controls it. This is not a pivot. It is a continuation.
          </p>
          <p>
            Now at Zetech University (BSc Computer Science, Year 2) and interning at IBM as a
            Software Developer, working on Agentic AI systems using Granite and watsonx Orchestrate.
            Located in Nairobi, Kenya.
          </p>
        </div>
      </section>

      {/* ── What φιλόσοφος means ────────────────── */}
      <section>
        <p className="label-mono mb-4">ON φιλόσοφος</p>
        <div className="border-l-2 border-emerald-dim pl-6 space-y-3">
          <p className="text-sm text-secondary-custom leading-relaxed max-w-xl">
            φιλόσοφος — Greek for &ldquo;lover of wisdom.&rdquo; Not used performatively. It describes a
            disposition: the belief that understanding a system deeply is more valuable than
            using it quickly.
          </p>
          <p className="text-sm text-secondary-custom leading-relaxed max-w-xl">
            This shows up in the work. Every project starts with understanding the problem before
            touching a keyboard. Every tool is chosen for what it actually does, not what it
            signals. Every abandoned project stays on the timeline — it happened, and it taught something.
          </p>
        </div>
      </section>

      {/* ── Machine ─────────────────────────────── */}
      <section>
        <p className="label-mono mb-4">THE_MACHINE</p>
        <div className="p-5 rounded-2xl border border-border-subtle bg-surface-2 max-w-sm">
          <p className="text-sm font-mono font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{profile.machine.name}</p>
          <p className="text-xs font-mono text-secondary-custom">{profile.machine.specs}</p>
          <p className="text-xs font-mono text-muted-custom mt-3">
            Every build in this portfolio ran on this machine.
          </p>
        </div>
      </section>

      {/* ── Career arc ──────────────────────────── */}
      <section>
        <p className="label-mono mb-6">CAREER_ARC</p>
        <div className="space-y-4">
          {CAREER_ARC.map((phase) => (
            <div
              key={phase.phase}
              className={`p-5 rounded-2xl border transition-all ${
                phase.active
                  ? 'border-emerald-dim bg-emerald-glow'
                  : 'border-border-subtle bg-surface-2'
              }`}
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <div>
                  <p className="label-mono mb-1">{phase.phase}</p>
                  <p className={`font-mono font-semibold ${phase.active ? 'text-emerald' : 'text-secondary-custom'}`}>
                    {phase.label}
                  </p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${
                  phase.active
                    ? 'border-emerald-dim text-emerald bg-emerald-glow'
                    : 'border-border-subtle text-muted-custom'
                }`}>
                  {phase.timing}
                </span>
              </div>
              <ul className="space-y-1">
                {phase.items.map((item) => (
                  <li key={item} className="text-xs font-mono text-secondary-custom flex items-center gap-2">
                    <span className={phase.active ? 'text-emerald' : 'text-muted-custom'}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
