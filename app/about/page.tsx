import type { Metadata } from 'next';
import { getProfile } from '@/lib/content/loaders';

export const metadata: Metadata = {
  title: 'Who Is Wisdom',
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
    label: 'Growth & Specialization',
    timing: 'Next',
    active: false,
    items: [
      'OSCP',
      'CySA+ · CASP+',
      'Deeper analyst or pen testing experience',
      'Team-level responsibility',
      'GRC and compliance exposure',
    ],
  },
];

export default function AboutPage() {
  const profile = getProfile();
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">Identity</p>
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
        <p className="label-mono">Background</p>
        <div className="space-y-4 text-sm text-secondary-custom leading-relaxed max-w-2xl">
          <p>
            I&apos;m currently pursuing a Bachelor&apos;s in Computer Science while building a
            public record of work across cybersecurity, AI-powered security, local AI, automation,
            and practical systems.
          </p>
          <p>
            I&apos;m gaining project-based experience through the i3/IBM ecosystem, working
            around cybersecurity, Red Hat, IBM technologies, and AI-assisted systems.
          </p>
          <p>
            Started in infrastructure, not code. Kenya Power. RK Shah. Close the Gap. Understanding
            how systems actually run before learning to build them. The shift happened naturally —
            operations to systems to intelligence. The same curiosity that drove understanding
            physical infrastructure now drives understanding the software that controls it.
          </p>
          <p>
            Located in Nairobi, Kenya.
          </p>
        </div>
      </section>

      {/* ── What φιλόσοφος means ────────────────── */}
      <section>
        <p className="label-mono mb-4">On φιλόσοφος</p>
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


      {/* ── Career direction ─────────────────────── */}
      <section>
        <p className="label-mono mb-6">Career direction</p>
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
