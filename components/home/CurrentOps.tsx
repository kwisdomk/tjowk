'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { currentStatus } from '@/lib/content/status';
import { Cpu, Activity } from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const date = new Date();
      const utc3 = new Date(date.getTime() + 3 * 60 * 60 * 1000);
      setTime(utc3.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'UTC' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time} UTC+3</span>;
}

function UtilBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center text-[10px] font-mono text-muted-custom mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-px bg-border-subtle rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
        />
      </div>
    </div>
  );
}

export function CurrentOps() {
  const [util, setUtil] = useState({ cpu: 62, ram: 71 });

  useEffect(() => {
    const id = setInterval(() => {
      setUtil({
        cpu: Math.floor(Math.random() * 25) + 50,
        ram: Math.floor(Math.random() * 20) + 60,
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* Current operation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <GlassCard label="CURRENT_OP" title={currentStatus.operation}>
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

      {/* Machine status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <GlassCard
          label="HOST_MACHINE"
          title={currentStatus.machine}
          controls={
            <Cpu className="w-3.5 h-3.5 text-muted-custom" />
          }
        >
          <div className="space-y-3 mt-2">
            <UtilBar label="CPU_UTIL" value={util.cpu} color="bg-emerald" />
            <UtilBar label="RAM_UTIL" value={util.ram} color="bg-blue-500" />
            <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-custom">
                <Activity className="w-3 h-3" />
                i5-13420H · RTX 3050 6GB
              </span>
              <span className="text-[10px] font-mono text-muted-custom">
                <LiveClock />
              </span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

    </div>
  );
}
