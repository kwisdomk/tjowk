'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { TimelineEntry } from '@/lib/content/schemas';
import { cn } from '@/lib/utils';

// --- Data Grouping ---

type GroupedTimeline = Map<number, Map<string, TimelineEntry[]>>;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

function extractMonth(date: string): string {
  const token = date.trim().split(/\s+/)[0]?.slice(0, 3).toLowerCase() ?? '';
  const index = MONTHS.findIndex((month) => month.toLowerCase() === token);
  return index === -1 ? token || 'Unknown' : MONTHS[index];
}

function monthIndex(date: string): number {
  const index = MONTHS.indexOf(extractMonth(date) as (typeof MONTHS)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function groupByYearAndMonth(entries: TimelineEntry[]): GroupedTimeline {
  const result = new Map<number, Map<string, TimelineEntry[]>>();

  // Sort entries chronologically (oldest first)
  const sorted = [...entries].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return monthIndex(a.date) - monthIndex(b.date);
  });

  for (const entry of sorted) {
    if (!result.has(entry.year)) result.set(entry.year, new Map());
    const yearMap = result.get(entry.year)!;
    const month = extractMonth(entry.date);
    if (!yearMap.has(month)) yearMap.set(month, []);
    yearMap.get(month)!.push(entry);
  }

  return result;
}

// --- Styles mapping ---

const typeColors: Record<TimelineEntry['type'], string> = {
  project:    'border-border-subtle bg-surface/50',
  experiment: 'border-border-subtle/50 bg-transparent',
  milestone:  'border-emerald-dim bg-emerald-glow',
};

// --- Sub-components ---

function ActivityChip({ entry }: { entry: TimelineEntry }) {
  const content = (
    <div
      className={cn(
        'p-3 rounded-xl border transition-colors flex flex-col gap-1.5 h-full',
        typeColors[entry.type],
        entry.highlight && 'ring-1 ring-emerald-500/20',
        entry.projectId && 'group-hover:border-emerald-dim'
      )}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <p
          className={cn(
            'text-sm font-mono font-medium',
            entry.highlight ? 'text-emerald' : 'text-primary'
          )}
        >
          {entry.title}
        </p>
        <span
          className={cn(
            'text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border flex-shrink-0',
            entry.type === 'milestone'
              ? 'border-emerald-dim text-emerald'
              : entry.type === 'project'
                ? 'border-border-subtle text-muted-custom'
                : 'border-border-subtle/50 text-muted-custom'
          )}
        >
          {entry.type}
        </span>
      </div>
      <p className="text-xs text-muted-custom leading-relaxed line-clamp-3">{entry.summary}</p>
    </div>
  );

  if (entry.projectId) {
    return (
      <div role="listitem" className="h-full">
        <Link
          href={`/projects/${entry.projectId}`}
          className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
        >
          {content}
        </Link>
      </div>
    );
  }

  return <div role="listitem" className="h-full">{content}</div>;
}

function MonthColumn({ month, entries }: { month: string; entries: TimelineEntry[] }) {
  return (
    <div className="flex flex-col gap-4 min-w-[260px] max-w-[300px]">
      <h3 className="label-mono text-emerald-dim font-bold">{month}</h3>
      <div role="list" className="flex flex-col gap-3">
        {entries.map(entry => (
          <ActivityChip key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

// --- Main Component ---

export function HorizontalTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  const grouped = groupByYearAndMonth(timeline);
  const years = Array.from(grouped.keys()).sort((a, b) => a - b);

  // Default to the most recent year expanded
  const [expandedYear, setExpandedYear] = useState<number | null>(years[years.length - 1] ?? null);

  const toggleYear = (year: number) => {
    setExpandedYear(prev => prev === year ? null : year);
  };

  return (
    // Outer wrapper: relative so gradients are pinned to visible edges
    <div className="relative w-full" role="region" aria-label="Project timeline">
      {/* Left edge fade — always visible at the container edge */}
      <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      {/* Right edge fade — always visible at the container edge */}
      <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* Inner scrollable region — gradients do NOT live here */}
      <div
        className="overflow-x-auto overflow-y-hidden pb-6 -mx-6 px-6"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex w-max min-w-full pt-8 pb-4 pr-12">
          {years.map((year) => {
            const isExpanded = expandedYear === year;
            const monthsMap = grouped.get(year)!;
            const months = Array.from(monthsMap.keys());

            return (
              <div
                key={year}
                className={cn(
                  'relative flex flex-col transition-[width,min-width] duration-300 ease-in-out',
                  isExpanded ? 'min-w-max pr-8' : 'w-[120px] md:w-[200px]'
                )}
              >
                {/* Horizontal Axis */}
                <div className="absolute top-[13px] left-0 right-0 h-px bg-border-subtle z-0" />

                {/* Year Node */}
                <div className="relative z-10 flex items-center mb-8 h-7">
                  <button
                    onClick={() => toggleYear(year)}
                    aria-expanded={isExpanded}
                    aria-controls={`year-${year}-content`}
                    className={cn(
                      'flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full pr-3 pl-1 py-1 transition-colors bg-black',
                      isExpanded ? 'ring-1 ring-emerald-500/20 bg-emerald-glow/20' : 'hover:bg-surface-2'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                      isExpanded ? 'border-emerald-dim bg-emerald-glow' : 'border-border bg-surface group-hover:border-emerald-dim'
                    )}>
                      {isExpanded && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    </div>
                    <span className={cn(
                      'text-sm font-mono font-semibold tracking-widest transition-colors',
                      isExpanded ? 'text-emerald' : 'text-muted-custom group-hover:text-primary'
                    )}>
                      {year}
                    </span>
                  </button>
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`year-${year}-content`}
                      role="region"
                      aria-label={`Timeline entries for ${year}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="flex gap-6 items-start overflow-hidden"
                    >
                      {months.map(month => (
                        <MonthColumn
                          key={`${year}-${month}`}
                          month={month}
                          entries={monthsMap.get(month)!}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
