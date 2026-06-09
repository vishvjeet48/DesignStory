import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <span className="mb-3 block font-sans text-xs font-medium uppercase tracking-[0.25em] text-brown dark:text-brown-light">
          {eyebrow}
        </span>
      )}
      <h2 className="editorial-heading">{title}</h2>
      {subtitle && (
        <p className={cn('editorial-subheading mt-4 max-w-2xl', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
