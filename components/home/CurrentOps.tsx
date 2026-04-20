'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { currentStatus } from '@/lib/content/status';

export function CurrentOps() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <GlassCard label="Current op" title={currentStatus.operation}>
        <div className="space-y-3 mt-2">
          <div>
            <p className="text-[10px] font-mono text-muted-custom uppercase tracking-wider mb-1">Secondary</p>
            <p className="text-xs font-mono text-secondary-custom">{currentStatus.secondaryOp}</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
            <span className="text-[10px] font-mono text-muted-custom">
              Updated {currentStatus.lastUpdated}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald">
              <span className="pulse-dot scale-75" />
              {currentStatus.uptime}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
