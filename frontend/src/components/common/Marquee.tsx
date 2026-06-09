import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  separator?: string
  reverse?: boolean
}

export function Marquee({
  items,
  speed = 'normal',
  className,
  separator = ' ◆ ',
  reverse = false,
}: MarqueeProps) {
  const text = items.join(separator) + separator
  const doubled = text + text

  return (
    <div
      className={cn('marquee-mask overflow-hidden', className)}
      aria-hidden
    >
      <div
        className={cn(
          'marquee-track flex whitespace-nowrap',
          speed === 'slow' && 'marquee-slow',
          speed === 'fast' && 'marquee-fast',
          reverse && 'marquee-reverse'
        )}
      >
        <span className="marquee-content px-4">{doubled}</span>
        <span className="marquee-content px-4">{doubled}</span>
      </div>
    </div>
  )
}
