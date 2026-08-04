'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-[140px] h-12 rounded-lg border border-border-subtle bg-transparent" aria-hidden="true">
        <span className="w-3.5 h-3.5 rounded-full bg-border-subtle animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex items-center p-0.5 rounded-lg border border-border-subtle bg-surface-2 gap-0.5" role="group" aria-label="Color theme">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Use light theme"
        aria-pressed={theme === 'light'}
        className={cn(
          'flex items-center justify-center min-w-11 min-h-11 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          theme === 'light' ? 'bg-surface text-primary shadow-sm border border-border-subtle' : 'text-muted-custom hover:text-primary border border-transparent'
        )}
      >
        <Sun className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        aria-label="Use system theme"
        aria-pressed={theme === 'system'}
        className={cn(
          'flex items-center justify-center min-w-11 min-h-11 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          theme === 'system' ? 'bg-surface text-primary shadow-sm border border-border-subtle' : 'text-muted-custom hover:text-primary border border-transparent'
        )}
      >
        <Monitor className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Use dark theme"
        aria-pressed={theme === 'dark'}
        className={cn(
          'flex items-center justify-center min-w-11 min-h-11 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          theme === 'dark' ? 'bg-surface text-primary shadow-sm border border-border-subtle' : 'text-muted-custom hover:text-primary border border-transparent'
        )}
      >
        <Moon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}
