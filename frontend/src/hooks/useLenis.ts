import { useEffect } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '@/animations/gsap'

export function useLenis() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    let raf = 0
    function frame(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 4000)

    return () => {
      clearTimeout(refreshTimer)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(refreshTimer)
  }, [pathname])
}
