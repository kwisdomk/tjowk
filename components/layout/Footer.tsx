import Link from 'next/link';
import type { Profile } from '@/lib/content/schemas';

export function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle">
      <div className="site-shell py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

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
        {(() => {
          const [quote, author] = profile.tagline.includes(' — ')
            ? profile.tagline.split(' — ')
            : [profile.tagline, null];
          return (
            <p className="text-xs text-secondary-custom max-w-sm text-center hidden md:block">
              <span className="italic">&ldquo;{quote}&rdquo;</span>
              {author && <span className="not-italic text-muted-custom ml-1.5 font-mono">— {author}</span>}
            </p>
          );
        })()}

        {/* Right — links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <Link
            href={`https://github.com/${profile.handles.github_primary}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-custom hover:text-emerald transition-colors"
          >
            github
          </Link>
          <Link
            href={`https://linkedin.com/in/${profile.handles.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
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
