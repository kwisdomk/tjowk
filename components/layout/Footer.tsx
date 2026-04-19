import Link from 'next/link';
import { profile } from '@/lib/content/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Left — identity */}
        <div>
          <p className="text-sm font-mono text-neutral-300">
            {profile.name} · <span className="text-emerald-400">{profile.alias}</span>
          </p>
          <p className="text-xs font-mono text-neutral-600 mt-1">
            {profile.location} · {profile.timezone}
          </p>
        </div>

        {/* Center — philosophy */}
        <p className="text-xs text-neutral-600 max-w-sm text-center hidden md:block italic">
          &ldquo;{profile.tagline}&rdquo;
        </p>

        {/* Right — links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <Link
            href={`https://github.com/${profile.handles.github_primary}`}
            target="_blank"
            className="text-neutral-600 hover:text-emerald-400 transition-colors"
          >
            github
          </Link>
          <Link
            href={`https://linkedin.com/in/${profile.handles.linkedin}`}
            target="_blank"
            className="text-neutral-600 hover:text-emerald-400 transition-colors"
          >
            linkedin
          </Link>
          <span className="text-neutral-800">·</span>
          <span className="text-neutral-700">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
