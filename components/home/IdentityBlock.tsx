'use client';

import { motion } from 'framer-motion';
import { profile } from '@/lib/content/profile';
import { MapPin, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function IdentityBlock() {
  return (
    <div className="space-y-6">
      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="label-mono mb-3">System boot // Identity resolved</p>
        <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-tight leading-none">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg font-mono text-emerald tracking-wide">
          {profile.alias}
        </p>
      </motion.div>

      {/* Roles */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <span className="px-3 py-1 rounded-full border border-border text-xs font-mono text-secondary-custom bg-surface-2/50">
          {profile.role}
        </span>
        {profile.subRoles.map((role) => (
          <span
            key={role}
            className="px-3 py-1 rounded-full border border-border-subtle text-xs font-mono text-muted-custom"
          >
            {role}
          </span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-l-2 border-emerald-dim pl-4"
      >
        <p className="text-secondary-custom text-sm leading-relaxed italic">
          &ldquo;{profile.tagline}&rdquo;
        </p>
      </motion.blockquote>

      {/* Location + links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-custom"
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          {profile.location} · {profile.timezone}
        </span>
        <Link
          href={`https://github.com/${profile.handles.github_primary}`}
          target="_blank"
          className="flex items-center gap-1.5 hover:text-emerald transition-colors"
        >
          <Github className="w-3 h-3" />
          {profile.handles.github_primary}
        </Link>
        <Link
          href={`https://linkedin.com/in/${profile.handles.linkedin}`}
          target="_blank"
          className="flex items-center gap-1.5 hover:text-emerald transition-colors"
        >
          <Linkedin className="w-3 h-3" />
          {profile.handles.linkedin}
        </Link>
      </motion.div>
    </div>
  );
}
