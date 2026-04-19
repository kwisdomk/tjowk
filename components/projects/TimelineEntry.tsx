'use client';

import { motion } from 'framer-motion';
import { type TimelineEntry } from '@/lib/content/timeline';
import { cn } from '@/lib/utils';

interface TimelineEntryProps {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}

const typeColors: Record<TimelineEntry['type'], string> = {
  project:    'border-border-subtle bg-surface/50',
  experiment: 'border-border-subtle/50 bg-transparent',
  milestone:  'border-emerald-dim bg-emerald-glow',
};

const typeDots: Record<TimelineEntry['type'], string> = {
  project:    'bg-foreground/30 border-border',
  experiment: 'bg-muted-foreground border-border',
  milestone:  'bg-emerald border-emerald-dim',
};

export function TimelineEntryItem({ entry, index, isLast }: TimelineEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="relative flex gap-5"
    >
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-5">
        <div
          className={cn(
            'w-2 h-2 rounded-full border flex-shrink-0 mt-1.5',
            typeDots[entry.type]
          )}
        />
        {!isLast && (
          <div className="flex-1 w-px bg-border-subtle mt-1.5 min-h-[1.5rem]" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex-1 mb-4 p-3 rounded-xl border transition-colors',
          typeColors[entry.type],
          entry.highlight && 'ring-1 ring-emerald-500/20'
        )}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <span className="label-mono block mb-0.5">{entry.date}</span>
            <p
              className={cn(
                'text-sm font-mono font-medium',
                entry.highlight ? 'text-emerald' : 'text-primary'
              )}
            >
              {entry.title}
            </p>
            <p className="text-xs text-muted-custom mt-1 leading-relaxed">{entry.summary}</p>
          </div>
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
      </div>
    </motion.div>
  );
}
