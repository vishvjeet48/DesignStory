import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.add('theme-transition')
        toggleTheme()
        setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500)
      }}
      className={cn(
        'rounded-full p-2.5 transition-colors hover:bg-sand/60 dark:hover:bg-surface',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-charcoal" />
      ) : (
        <Sun className="h-5 w-5 text-[#F5F5F5]" />
      )}
    </button>
  )
}
