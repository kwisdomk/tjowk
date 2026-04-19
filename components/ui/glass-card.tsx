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
        'glass relative overflow-hidden transition-all duration-300',
        hover && 'hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />

      <div className="relative p-6 h-full flex flex-col">
        {(label || title || controls) && (
          <div className="mb-5 flex items-start justify-between border-b border-border-subtle pb-3">
            <div>
              {label && (
                <p className="label-mono mb-1">{label}</p>
              )}
              {title && (
                <h3 className="text-sm font-medium text-primary font-mono-custom">{title}</h3>
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
