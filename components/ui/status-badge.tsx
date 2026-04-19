import { cn } from '@/lib/utils';

type StatusVariant = 'active' | 'paused' | 'archived' | 'complete' | 'in-progress' | 'planned' | 'stable' | 'critical';

const variantStyles: Record<StatusVariant, string> = {
  active:       'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
  stable:       'border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/10',
  paused:       'border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10',
  archived:     'border-neutral-500/20 text-neutral-600 dark:text-neutral-400 bg-neutral-500/10',
  complete:     'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
  'in-progress':'border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10',
  planned:      'border-neutral-500/20 text-neutral-600 dark:text-neutral-400 bg-neutral-500/10',
  critical:     'border-red-500/20 text-red-600 dark:text-red-400 bg-red-500/10',
};

const variantDots: Record<StatusVariant, string> = {
  active:       'bg-emerald-500 dark:bg-emerald-400',
  stable:       'bg-blue-500 dark:bg-blue-400',
  paused:       'bg-amber-500 dark:bg-amber-400',
  archived:     'bg-neutral-500 dark:bg-neutral-400',
  complete:     'bg-emerald-500 dark:bg-emerald-400',
  'in-progress':'bg-amber-500 dark:bg-amber-400',
  planned:      'bg-neutral-500 dark:bg-neutral-400',
  critical:     'bg-red-500 dark:bg-red-400',
};

const labelMap: Record<StatusVariant, string> = {
  active:       'ACTIVE',
  stable:       'STABLE',
  paused:       'PAUSED',
  archived:     'ARCHIVED',
  complete:     'COMPLETE',
  'in-progress':'IN PROGRESS',
  planned:      'PLANNED',
  critical:     'CRITICAL',
};

interface StatusBadgeProps {
  status: StatusVariant;
  className?: string;
  showDot?: boolean;
  label?: string;   // override default label
}

export function StatusBadge({ status, className, showDot = true, label }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border',
        'text-[10px] font-mono font-medium tracking-widest uppercase',
        variantStyles[status],
        className
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', variantDots[status])} />
      )}
      {label ?? labelMap[status]}
    </span>
  );
}
