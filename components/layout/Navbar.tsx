'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { currentStatus } from '@/lib/content/status';
import { ModeToggle } from '@/components/ui/theme-toggle';

const NAV_LINKS = [
  { href: '/',         label: 'System' },
  { href: '/projects', label: 'Operations' },
  { href: '/about',    label: 'Operator' },
  { href: '/certs',    label: 'Credentials' },
  { href: '/contact',  label: 'Signal' },
  { href: '/journal',  label: 'Journal' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Left — logo / identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <span className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-400 text-[9px] font-mono font-bold">φ</span>
          </span>
          <span className="text-sm font-mono font-medium text-neutral-300 group-hover:text-white transition-colors">
            kwisdomk
          </span>
        </Link>

        {/* Center — nav links (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150',
                  active
                    ? 'text-emerald-400 bg-emerald-950/50'
                    : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right — status + theme toggle */}
        <div className="flex items-center gap-3">
          {/* Live status pulse */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/30">
            <span className="pulse-dot" />
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest">
              {currentStatus.uptime}
            </span>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
