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
        Field notes from the build. Dispatches from active systems, real deployments, and things
        worth writing down. First entries incoming.
      </p>
      <div className="mt-12 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] max-w-sm">
        <p className="label-mono mb-2">NEXT ENTRY</p>
        <p className="text-sm font-mono text-neutral-500">
          How I deployed IBM MAS 9.1 solo on OpenShift ROKS — from zero to EAAAIW 2026 in 3 weeks.
        </p>
        <p className="text-[10px] font-mono text-neutral-700 mt-3">Incoming.</p>
      </div>
    </div>
  );
}
