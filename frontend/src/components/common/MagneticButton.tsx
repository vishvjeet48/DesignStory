import { Link } from 'react-router-dom'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  to?: string
  href?: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'outline'
  onClick?: () => void
}

export function MagneticButton({
  to,
  href,
  children,
  className,
  variant = 'primary',
  onClick,
}: MagneticButtonProps) {
  const { ref, onMove, onLeave } = useMagnetic(0.25)
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300',
    variant === 'primary'
      ? 'bg-brown text-cream hover:bg-brown/90 dark:bg-brown-light dark:text-dark'
      : 'border border-charcoal/25 bg-transparent hover:border-brown dark:border-[#F5F5F5]/25',
    className
  )

  if (to) {
    return (
      <Link
        to={to}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={base}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="hover"
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={base}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="hover"
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={base}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor="hover"
    >
      {children}
    </button>
  )
}
