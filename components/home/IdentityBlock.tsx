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
        <p className="label-mono mb-3">SYSTEM_BOOT // IDENTITY_RESOLVED</p>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg font-mono text-emerald-400 tracking-wide">
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
        <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-neutral-300 bg-white/[0.03]">
          {profile.role}
        </span>
        {profile.subRoles.map((role) => (
          <span
            key={role}
            className="px-3 py-1 rounded-full border border-white/[0.06] text-xs font-mono text-neutral-500"
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
        className="border-l-2 border-emerald-500/40 pl-4"
      >
        <p className="text-neutral-400 text-sm leading-relaxed italic">
          &ldquo;{profile.tagline}&rdquo;
        </p>
      </motion.blockquote>

      {/* Location + links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600"
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          {profile.location} · {profile.timezone}
        </span>
        <Link
          href={`https://github.com/${profile.handles.github_primary}`}
          target="_blank"
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <Github className="w-3 h-3" />
          {profile.handles.github_primary}
        </Link>
        <Link
          href={`https://linkedin.com/in/${profile.handles.linkedin}`}
          target="_blank"
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <Linkedin className="w-3 h-3" />
          {profile.handles.linkedin}
        </Link>
      </motion.div>
    </div>
  );
}
