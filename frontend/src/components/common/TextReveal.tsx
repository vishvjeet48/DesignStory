import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'span'
}

export function TextReveal({ text, className, delay = 0, as: Tag = 'h1' }: TextRevealProps) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 4, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
