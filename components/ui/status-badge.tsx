import { cn } from '@/lib/utils';

type StatusVariant = 'active' | 'paused' | 'archived' | 'complete' | 'in-progress' | 'planned' | 'stable' | 'critical';

const variantStyles: Record<StatusVariant, string> = {
  active:       'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
  stable:       'border-blue-500/40 text-blue-400 bg-blue-950/40',
  paused:       'border-amber-500/40 text-amber-400 bg-amber-950/40',
  archived:     'border-neutral-600/40 text-neutral-500 bg-neutral-900/40',
  complete:     'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
  'in-progress':'border-amber-500/40 text-amber-400 bg-amber-950/40',
  planned:      'border-neutral-600/40 text-neutral-500 bg-neutral-900/40',
  critical:     'border-red-500/40 text-red-400 bg-red-950/40',
};

const variantDots: Record<StatusVariant, string> = {
  active:       'bg-emerald-400',
  stable:       'bg-blue-400',
  paused:       'bg-amber-400',
  archived:     'bg-neutral-500',
  complete:     'bg-emerald-400',
  'in-progress':'bg-amber-400',
  planned:      'bg-neutral-500',
  critical:     'bg-red-400',
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
