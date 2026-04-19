'use client';

import { timeline } from '@/lib/content/timeline';
import { TimelineEntryItem } from './TimelineEntry';

// Group entries by year
function groupByYear(entries: typeof timeline) {
  return entries.reduce<Record<number, typeof timeline>>((acc, entry) => {
    if (!acc[entry.year]) acc[entry.year] = [];
    acc[entry.year].push(entry);
    return acc;
  }, {});
}

export function TimelineSpine() {
  const grouped = groupByYear(timeline);
  const years = Object.keys(grouped).map(Number).sort((a, b) => a - b);

  return (
    <div className="space-y-10">
      {years.map((year) => {
        const entries = grouped[year];
        return (
          <section key={year}>
            {/* Year header */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-mono font-semibold text-emerald-400 tracking-widest">
                {year}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 to-transparent" />
            </div>

            {/* Entries for this year */}
            <div>
              {entries.map((entry, i) => (
                <TimelineEntryItem
                  key={entry.id}
                  entry={entry}
                  index={i}
                  isLast={i === entries.length - 1}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
