import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Field notes from the build. Coming.',
};

export default function JournalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="label-mono mb-3">SYSTEM_JOURNAL</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
        Dispatches.
      </h1>
      <p className="text-sm font-mono text-neutral-600 max-w-md leading-relaxed">
        Field notes from the build. Not yet wired — MDX setup is Session 3.
        When it ships, a file in <code className="text-neutral-500">/content/journal/</code> will
        become a post. No CMS. No database.
      </p>
      <div className="mt-12 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] max-w-sm">
        <p className="label-mono mb-2">NEXT ENTRY</p>
        <p className="text-sm font-mono text-neutral-500">
          How I deployed IBM MAS 9.1 solo on OpenShift ROKS — from zero to EAAAIW 2026 in 3 weeks.
        </p>
        <p className="text-[10px] font-mono text-neutral-700 mt-3">Coming when the journal is wired.</p>
      </div>
    </div>
  );
}
