import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  label?: string;       // mono label above title
  controls?: ReactNode; // top-right action area
  onClick?: () => void;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  title,
  label,
  controls,
  onClick,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/5 bg-black/50 backdrop-blur-2xl transition-all duration-300',
        hover && 'hover:border-white/15 hover:bg-black/60',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

      <div className="relative p-6 h-full flex flex-col">
        {(label || title || controls) && (
          <div className="mb-5 flex items-start justify-between border-b border-white/[0.06] pb-3">
            <div>
              {label && (
                <p className="label-mono mb-1">{label}</p>
              )}
              {title && (
                <h3 className="text-sm font-medium text-neutral-300 font-mono-custom">{title}</h3>
              )}
            </div>
            {controls && (
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">{controls}</div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
