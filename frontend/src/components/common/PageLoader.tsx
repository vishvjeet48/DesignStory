import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimate, stagger } from 'framer-motion'

// ── Pen Nib — matches logo exactly (slim tapered body, 12° tilt, gold tip) ────
function PenNib() {
  return (
    <div style={{ position: 'absolute', top: -38, right: -10 }}>
      <motion.svg
        width="26" height="52" viewBox="0 0 26 52" fill="none"
        style={{ rotate: '12deg', transformOrigin: 'center center' }}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.12)" />
            <stop offset="40%"  stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.18)" />
          </linearGradient>
          <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="50%"  stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Slim tapered body */}
        <motion.path
          d="M13 2 C15.5 2 18 4 18.5 8 L20 36 L13 50 L6 36 L7.5 8 C8 4 10.5 2 13 2 Z"
          fill="url(#bodyGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.2, duration: 1.0 }}
        />
        {/* Highlight shine strip */}
        <motion.path
          d="M13 2 C14.2 2 16 3.5 16.8 7 L17.8 28 L16.5 28 L15.5 7.5 C15 4.5 14 3 13 2.5 Z"
          fill="url(#shineGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3, duration: 1.0 }}
        />
        {/* Top cap */}
        <motion.ellipse
          cx="13" cy="3" rx="3.5" ry="2"
          fill="rgba(255,255,255,0.6)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        />
        {/* Gold nib tip — bounces in */}
        <motion.path
          d="M13 50 L6 36 L13 40 L20 36 Z"
          fill="#E8A030"
          style={{ transformOrigin: '13px 50px' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* Ink drop */}
        <motion.line
          x1="13" y1="50" x2="13" y2="50"
          stroke="#E8A030" strokeWidth="1.2" strokeLinecap="round"
          initial={{ x2: 13, y2: 50, opacity: 0 }}
          animate={{ x2: 13, y2: 68, opacity: 0.85 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>

      {/* Pen floats after landing */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        animate={{ y: [0, -3, 0, -2, 0] }}
        transition={{ delay: 1.3, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ── Char reveal — clips upward from overflow:hidden parent ───────────────────
function RevealWord({
  text,
  baseDelay,
  staggerDelay = 0.09,
  fontSize,
  fontStyle = 'normal',
  color = '#fff',
  skew = false,
}: {
  text: string
  baseDelay: number
  staggerDelay?: number
  fontSize: string
  fontStyle?: string
  color?: string
  skew?: boolean
}) {
  return (
    <div style={{ overflow: 'hidden', lineHeight: 1 }}>
      <div style={{ display: 'flex' }}>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            style={{
              display: 'inline-block',
              fontFamily: '"Playfair Display", serif',
              fontWeight: fontStyle === 'italic' ? 400 : 700,
              fontStyle,
              fontSize,
              color,
              letterSpacing: fontStyle === 'italic' ? '0.01em' : '-0.01em',
              lineHeight: 1,
            }}
            initial={{ y: '105%', skewX: skew ? -10 : 0 }}
            animate={{ y: '0%', skewX: 0 }}
            transition={{
              delay: baseDelay + i * staggerDelay,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// ── Loader ────────────────────────────────────────────────────────────────────
interface PageLoaderProps {
  onComplete?: () => void
  duration?: number
}

export function PageLoader({ onComplete, duration = 4200 }: PageLoaderProps) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true)
      setTimeout(() => onComplete?.(), 900)
    }, duration)
    return () => clearTimeout(t)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 65% 65% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)',
          }} />

          {/* Logo */}
          <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* THE */}
            <motion.span
              style={{
                fontFamily: '"Lato", sans-serif', fontWeight: 300,
                fontSize: 11, letterSpacing: '0.55em',
                color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
                marginBottom: 1,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              THE
            </motion.span>

            {/* Design + Pen */}
            <div style={{ position: 'relative' }}>
              <RevealWord
                text="Design"
                baseDelay={0.5}
                staggerDelay={0.09}
                fontSize="clamp(52px, 12vw, 76px)"
              />
              <PenNib />
            </div>

            {/* Story + dots */}
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: -5 }}>
              <RevealWord
                text="Story"
                baseDelay={1.4}
                staggerDelay={0.08}
                fontSize="clamp(36px, 8vw, 50px)"
                fontStyle="italic"
                skew
              />
              <motion.span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic', fontSize: 'clamp(36px, 8vw, 50px)',
                  color: '#E8A030', display: 'inline-block',
                  transformOrigin: 'left center', marginLeft: 1,
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.85, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              >
                ...
              </motion.span>
            </div>

            {/* By Gaurav & Yogita */}
            <motion.span
              style={{
                fontFamily: '"Lato", sans-serif', fontWeight: 300,
                fontSize: 10, letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                marginTop: 10,
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              By Gaurav &amp; Yogita
            </motion.span>

            {/* Gold underline sweep */}
            <motion.div
              style={{
                marginTop: 12, height: 1,
                background: 'linear-gradient(to right, #E8A030, rgba(232,160,48,0))',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0, opacity: 0, width: '100%' }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Corner marks */}
          {[
            { top: 24, left: 24, borderTop: '1px solid', borderLeft: '1px solid' },
            { top: 24, right: 24, borderTop: '1px solid', borderRight: '1px solid' },
            { bottom: 24, left: 24, borderBottom: '1px solid', borderLeft: '1px solid' },
            { bottom: 24, right: 24, borderBottom: '1px solid', borderRight: '1px solid' },
          ].map((s, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', width: 20, height: 20, borderColor: 'rgba(232,160,48,0.2)', ...s }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}