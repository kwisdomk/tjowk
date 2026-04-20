'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch — only render theme-aware UI after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-lg',
        'border border-border-subtle hover:border-border-hover',
        'bg-transparent hover:bg-surface-2',
        'text-muted-custom hover:text-primary',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      {/* Skeleton placeholder while not mounted */}
      {!mounted ? (
        <span className="w-4 h-4 rounded-full bg-border-subtle animate-pulse" />
      ) : isDark ? (
        <Sun
          className="w-4 h-4 transition-transform duration-300 rotate-0"
          strokeWidth={1.75}
        />
      ) : (
        <Moon
          className="w-4 h-4 transition-transform duration-300 rotate-0"
          strokeWidth={1.75}
        />
      )}
    </button>
  )
}
