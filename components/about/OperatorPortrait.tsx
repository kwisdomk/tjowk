'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface OperatorPortraitProps {
  avatar?: string;
  name: string;
  location: string;
  timezone: string;
}

export function OperatorPortrait({
  avatar = '/images/founder.jpeg',
  name,
  location,
  timezone,
}: OperatorPortraitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full flex justify-center md:justify-end"
    >
      <div className="relative group max-w-[300px] w-full aspect-[4/5] rounded-2xl border border-border-subtle bg-surface-2/80 backdrop-blur-xl p-2.5 transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]">
        {/* Technical Corner Brackets */}
        <span className="absolute top-2 left-2 text-[9px] font-mono text-emerald/60 select-none z-20">[+]</span>
        <span className="absolute top-2 right-2 text-[9px] font-mono text-emerald/60 select-none z-20">[+]</span>
        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-emerald/60 select-none z-20">[+]</span>
        <span className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald/60 select-none z-20">[+]</span>

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between px-3 py-1 mb-1.5 border-b border-border-subtle text-[9px] font-mono text-muted-custom">
          <span className="text-emerald tracking-widest font-semibold uppercase">SYS_OP // FOUNDER</span>
          <span className="opacity-60 uppercase">{name.split(' ')[0]}</span>
        </div>

        {/* Image Frame with Grayscale to Color Hover Transition */}
        <div className="relative w-full h-[calc(100%-48px)] rounded-xl overflow-hidden bg-surface border border-border-subtle">
          <Image
            src={avatar}
            alt={`${name} — Operator`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover object-top grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
          {/* Subtle vignette/scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
        </div>

        {/* Bottom Location Telemetry */}
        <div className="flex items-center justify-between px-2 pt-2 text-[9px] font-mono text-muted-custom">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="truncate uppercase">{location}</span>
          </span>
          <span className="text-secondary-custom font-mono text-[9px] opacity-75 flex-shrink-0">{timezone}</span>
        </div>
      </div>
    </motion.div>
  );
}
