import { useEffect, useState } from 'react'

export function useScrollDirection(threshold = 80) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - lastY) < threshold) return
      setHidden(y > lastY && y > 120)
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { hidden, scrolled }
}
