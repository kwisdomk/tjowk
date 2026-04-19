import Link from 'next/link';
import { profile } from '@/lib/content/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Left — identity */}
        <div>
          <p className="text-sm font-mono text-primary">
            {profile.name} · <span className="text-emerald">{profile.alias}</span>
          </p>
          <p className="text-xs font-mono text-secondary-custom mt-1">
            {profile.location} · {profile.timezone}
          </p>
        </div>

        {/* Center — philosophy */}
        <p className="text-xs text-secondary-custom max-w-sm text-center hidden md:block italic">
          &ldquo;{profile.tagline}&rdquo;
        </p>

        {/* Right — links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <Link
            href={`https://github.com/${profile.handles.github_primary}`}
            target="_blank"
            className="text-secondary-custom hover:text-emerald transition-colors"
          >
            github
          </Link>
          <Link
            href={`https://linkedin.com/in/${profile.handles.linkedin}`}
            target="_blank"
            className="text-secondary-custom hover:text-emerald transition-colors"
          >
            linkedin
          </Link>
          <span className="text-muted-custom">·</span>
          <span className="text-muted-custom">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
