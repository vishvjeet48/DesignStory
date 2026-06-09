import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  asChild?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brown text-cream hover:bg-brown/90 dark:bg-brown-light dark:text-dark dark:hover:bg-brown-light/90',
  secondary:
    'bg-sand/80 text-charcoal hover:bg-sand dark:bg-surface dark:text-[#F5F5F5] dark:hover:bg-surface/80',
  ghost: 'bg-transparent hover:bg-sand/50 dark:hover:bg-surface',
  outline:
    'border border-charcoal/20 bg-transparent hover:border-brown dark:border-[#F5F5F5]/20 dark:hover:border-brown-light',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'
