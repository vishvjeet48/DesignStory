import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-sm border border-charcoal/15 bg-primary/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-charcoal/40 focus:border-brown dark:border-[#F5F5F5]/15 dark:bg-surface dark:placeholder:text-[#F5F5F5]/40 dark:focus:border-brown-light',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
