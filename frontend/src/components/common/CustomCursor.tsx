import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea, select')
      )
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brown mix-blend-difference md:block dark:bg-brown-light"
        animate={{ x: pos.x, y: pos.y, scale: hovering ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[149] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brown/40 md:block dark:border-brown-light/40"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovering ? 2.2 : 1,
          opacity: hovering ? 0.6 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />
    </>
  )
}
