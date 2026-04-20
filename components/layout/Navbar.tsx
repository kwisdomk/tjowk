'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-surface/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Left — logo / identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-6 h-6 rounded-md bg-emerald-glow border border-emerald-dim flex items-center justify-center flex-shrink-0">
              <span className="text-emerald text-[9px] font-mono font-bold">φ</span>
            </span>
            <span className="text-sm font-mono font-medium text-secondary-custom group-hover:text-primary transition-colors">
              kwisdomk
            </span>
          </Link>

          {/* Center — desktop nav links */}
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
                      ? 'text-emerald bg-emerald-glow'
                      : 'text-muted-custom hover:text-primary hover:bg-surface-2'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right — status + theme toggle + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-dim bg-emerald-glow">
              <span className="pulse-dot" />
              <span className="text-[10px] font-mono text-emerald tracking-widest">
                {currentStatus.uptime}
              </span>
            </div>
            <ModeToggle />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-border-subtle text-muted-custom hover:text-primary hover:bg-surface-2 transition-all"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 top-14 z-40 md:hidden flex flex-col bg-surface/95 backdrop-blur-2xl border-t border-border-subtle"
          >
            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 pt-8 pb-6">
              <p className="label-mono mb-6">Navigate</p>
              <ul className="space-y-1">
                {NAV_LINKS.map(({ href, label }, i) => {
                  const active = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                    >
                      <Link
                        href={href}
                        className={cn(
                          'flex items-center justify-between w-full px-4 py-3 rounded-xl font-mono text-sm transition-all',
                          active
                            ? 'text-emerald bg-emerald-glow border border-emerald-dim'
                            : 'text-secondary-custom hover:text-primary hover:bg-surface-2 border border-transparent'
                        )}
                      >
                        <span>{label}</span>
                        {active && <span className="text-[10px] text-emerald">●</span>}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer strip */}
            <div className="px-6 py-5 border-t border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="pulse-dot scale-75" />
                <span className="text-[10px] font-mono text-emerald">{currentStatus.uptime}</span>
              </div>
              <span className="text-[10px] font-mono text-muted-custom">kwisdomk · Nairobi, Kenya</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
