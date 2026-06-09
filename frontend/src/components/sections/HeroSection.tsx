import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MagneticButton } from '@/components/common/MagneticButton'
import { Marquee } from '@/components/common/Marquee'
import { ROUTES } from '@/constants/routes'

const TAGLINES = [
  { line1: 'Every Space',  line2: 'Has A Story.' },
  { line1: 'Every Detail', line2: 'Tells A Tale.' },
  { line1: 'Every Room',   line2: 'Holds A Dream.' },
  { line1: 'Every Home',   line2: 'Finds Its Soul.' },
]

function SplitText({ text, className, style, baseDelay = 0, stagger = 0.032 }: {
  text: string
  className?: string
  style?: React.CSSProperties
  baseDelay?: number
  stagger?: number
}) {
  return (
    <span className={className} style={{ ...style, display: 'block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', willChange: 'transform' }}
          initial={{ y: '110%', opacity: 0, rotateX: 40 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          transition={{
            delay: baseDelay + i * stagger,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const [index, setIndex]   = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25 })
  const bgX     = useTransform(smoothX, [-0.5, 0.5], [-14, 14])
  const bgY     = useTransform(smoothY, [-0.5, 0.5], [-8,   8])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth  - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % TAGLINES.length)
      setAnimKey(k => k + 1)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  useGSAP(() => {
    if (!bgRef.current) return
    gsap.to(bgRef.current, {
      scale: 1.06,
      duration: 24,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })
  }, { scope: sectionRef })

  const current = TAGLINES[index]

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-[#060606] pb-0 pt-20"
    >
      {/* ── Background ───────────────────────────────── */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ x: bgX, y: bgY }}>
        <div ref={bgRef} className="absolute inset-[-8%]">
          {/*
            Wide, minimal interior — double-height living room with floor-to-ceiling
            windows flooding in natural light. Sky visible outside, no clutter.
            Unsplash: photo by Francesca Tosolini (bright minimal interior)
          */}
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 50%', opacity: 0.48 }}
          />
        </div>

        {/* Bottom fade — text zone is fully clear */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(6,6,6,0.30) 0%, rgba(6,6,6,0.05) 25%, rgba(6,6,6,0.05) 45%, rgba(6,6,6,0.75) 72%, #060606 92%)',
        }} />
        {/* Side vignettes — keep edges from looking cut-off */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(6,6,6,0.50) 0%, transparent 22%, transparent 78%, rgba(6,6,6,0.50) 100%)',
        }} />
      </motion.div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pb-32 pt-8 md:px-10 lg:px-16 lg:pb-40">

        {/* Eyebrow */}
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="block h-px bg-[#B48C5A]"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="text-[10px] uppercase tracking-[0.44em] text-[#B48C5A]">
            Premium Interior Design
          </span>
        </motion.div>

        {/* Headline */}
        <div className="relative overflow-hidden" style={{ perspective: '800px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={animKey}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.3 } }}
              className="pb-2"
            >
              <SplitText
                text={current.line1}
                className="font-display font-medium leading-[0.9] tracking-tight text-white/90"
                style={{ fontSize: 'clamp(3.2rem, 11.5vw, 9.5rem)' }}
                baseDelay={0}
                stagger={0.028}
              />
              <SplitText
                text={current.line2}
                className="font-display font-medium italic leading-[0.9] tracking-tight"
                style={{
                  fontSize: 'clamp(3.2rem, 11.5vw, 9.5rem)',
                  background: 'linear-gradient(128deg, #C4905A 0%, #EAC97E 42%, #B8782E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                baseDelay={0.12}
                stagger={0.028}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hairline */}
        <motion.div
          className="mt-8 h-px"
          style={{
            background: 'linear-gradient(to right, rgba(180,140,90,0.5), transparent)',
            width: 64,
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-xs font-serif text-[15px] leading-[1.75] text-white/35 md:max-w-sm md:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Where light, texture, and emotion collide — we sculpt interiors that feel like cinema, not catalogues.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton to={ROUTES.projects} className="hero-cta-primary">
            View Projects
          </MagneticButton>
          <MagneticButton
            to={ROUTES.book}
            variant="outline"
            className="hero-cta-ghost border-white/12 text-white/55 hover:border-[#B48C5A]/50 hover:text-[#B48C5A]"
          >
            Book Consultation
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Marquee ──────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.05] bg-[#060606]/85 backdrop-blur-md">
        <Marquee
          items={['TIMELESS', 'CRAFT', 'EMOTION', 'LIGHT', 'TEXTURE', 'NARRATIVE', 'LUXURY', 'FORM']}
          className="py-4 font-display text-[11px] uppercase tracking-[0.38em] text-white/22 md:text-sm"
          separator=" · "
        />
      </div>

      {/* ── Scroll cue ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="text-[8px] uppercase tracking-[0.45em] text-white/22">Scroll</span>
        <motion.div
          className="h-14 w-px"
          style={{ background: 'linear-gradient(to bottom, #B48C5A, transparent)' }}
          animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Corner marks ─────────────────────────────── */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-[5.5rem] right-6 border-b border-r',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute h-5 w-5 ${cls} border-[#B48C5A]/20`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 + i * 0.1, duration: 0.6 }}
        />
      ))}
    </section>
  )
}