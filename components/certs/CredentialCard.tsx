'use client';

import { motion } from 'framer-motion';
import { type Cert } from '@/lib/content/certs';
import { StatusBadge } from '@/components/ui/status-badge';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CredentialCardProps {
  cert: Cert;
  index: number;
}

export function CredentialCard({ cert, index }: CredentialCardProps) {
  const isComplete = cert.status === 'complete';
  const isInProgress = cert.status === 'in-progress';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        'flex items-start justify-between gap-4 p-4 rounded-xl border transition-all duration-200',
        isComplete
          ? 'border-border-subtle bg-surface hover:border-border'
          : isInProgress
            ? 'border-amber-500/20 bg-amber-500/10 hover:border-amber-500/30'
            : 'border-border-subtle/50 bg-transparent'
      )}
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-sm font-mono font-medium text-primary truncate">{cert.title}</p>
          {cert.credlyUrl && (
            <Link href={cert.credlyUrl} target="_blank">
              <ExternalLink className="w-3 h-3 text-muted-custom hover:text-emerald transition-colors" />
            </Link>
          )}
        </div>
        <p className="text-[10px] font-mono text-muted-custom">{cert.issuer}</p>
        {cert.notes && (
          <p className="text-[10px] font-mono text-muted-custom mt-1 opacity-70">{cert.notes}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <StatusBadge status={cert.status} />
        {cert.score && (
          <span className="text-[10px] font-mono text-emerald">{cert.score}</span>
        )}
        {cert.date && (
          <span className="text-[10px] font-mono text-muted-custom">{cert.date}</span>
        )}
        {cert.deadline && (
          <span className="text-[10px] font-mono text-amber-500">→ {cert.deadline}</span>
        )}
      </div>
    </motion.div>
  );
}
