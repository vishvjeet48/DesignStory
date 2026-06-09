import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[2px] origin-left bg-brown dark:bg-brown-light"
      style={{ scaleX, width: '100%' }}
    />
  )
}
