'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Hammer, Sofa, Lamp, LayoutGrid, Building2, TreePine, Ruler, type LucideIcon } from 'lucide-react'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ROUTES } from '@/constants/routes'
import { useThemeStore, type Theme } from '@/store/themeStore'

interface ServiceCard {
  id: string
  icon: LucideIcon
  title: string
  description: string
  pills?: string[]
  stats?: { value: string; label: string }[]
  tag?: string
  span?: 'wide' | 'normal'
  accent: 'gold' | 'amber' | 'champagne'
}

const services: ServiceCard[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential design',
    description: 'Full-home interiors crafted around how you actually live — from layout to the last cushion.',
    pills: ['Turnkey', 'Modular'],
    accent: 'gold',
  },
  {
    id: 'landscape',
    icon: TreePine,
    title: 'Landscape & outdoor',
    description: 'Gardens, terraces, and courtyards designed as natural extensions of your interior.',
    pills: ['Terrace', 'Garden'],
    accent: 'amber',
  },
  {
    id: 'furniture',
    icon: Sofa,
    title: 'Furniture & styling',
    description: 'Bespoke furniture curation and final-day styling that makes every corner deliberate.',
    pills: ['Bespoke', 'Curated'],
    accent: 'champagne',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial & hospitality',
    description: 'Offices, restaurants, boutiques, and hotels — spaces that work hard and look effortless. We handle concept through construction documentation and FF&E procurement.',
    tag: 'Most popular',
    span: 'wide',
    stats: [
      { value: '48+', label: 'Projects' },
      { value: '6', label: 'City presence' },
      { value: '4.9', label: 'Avg rating' },
    ],
    accent: 'gold',
  },
  {
    id: 'lighting',
    icon: Lamp,
    title: 'Lighting design',
    description: 'Layered lighting schemes that shift mood from morning to evening without effort.',
    pills: ['Ambient', 'Accent'],
    accent: 'amber',
  },
  {
    id: 'planning',
    icon: Ruler,
    title: 'Space planning',
    description: 'Floor-plan strategy that maximises flow, light, and function before any material decisions.',
    accent: 'champagne',
  },
  {
    id: 'renovation',
    icon: Hammer,
    title: 'Renovation & construction',
    description: 'From structural changes to premium finishes — all project-managed under one roof. No coordination headaches, no handover gaps.',
    tag: 'End-to-end',
    span: 'wide',
    stats: [
      { value: '120+', label: 'Renovations' },
      { value: '12 yrs', label: 'Experience' },
    ],
    accent: 'gold',
  },
]

// Accent palettes — all on near-black backgrounds
const ACCENTS = {
  gold:      { border: '#c9933a', icon: '#c9933a', iconBg: 'rgba(201,147,58,.12)', tag: 'rgba(201,147,58,.18)', tagText: '#c9933a', pill: 'rgba(201,147,58,.14)', pillText: '#c9933a', stat: '#c9933a', glow: 'rgba(201,147,58,.18)' },
  amber:     { border: '#e8a83a', icon: '#e8a83a', iconBg: 'rgba(232,168,58,.12)', tag: 'rgba(232,168,58,.18)', tagText: '#e8a83a', pill: 'rgba(232,168,58,.14)', pillText: '#e8a83a', stat: '#e8a83a', glow: 'rgba(232,168,58,.16)' },
  champagne: { border: '#d4b896', icon: '#d4b896', iconBg: 'rgba(212,184,150,.12)', tag: 'rgba(212,184,150,.18)', tagText: '#d4b896', pill: 'rgba(212,184,150,.14)', pillText: '#d4b896', stat: '#d4b896', glow: 'rgba(212,184,150,.14)' },
}

// ─── Clay card ────────────────────────────────────────────────────
function ClayCard({ svc, delay, theme }: { svc: ServiceCard; delay: number; theme: Theme }) {
  const [lift, setLift] = useState(false)
  const isLight = theme === 'light'
  const a = ACCENTS[svc.accent]

  const cardBg = lift
    ? isLight ? '#f8f3e8' : '#141410'
    : isLight ? '#fffdf8' : '#0f0f0b'
  const border = lift ? a.border : isLight ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.07)'
  const shadow = lift
    ? isLight
      ? `0 0 0 1px ${a.border}, 0 16px 48px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.08)`
      : `0 0 0 1px ${a.border}, 0 16px 48px ${a.glow}, 0 8px 24px rgba(0,0,0,.7)`
    : isLight
      ? `0 0 0 1px ${border}, 0 4px 20px rgba(0,0,0,.08)`
      : `0 0 0 1px ${border}, 0 4px 20px rgba(0,0,0,.5)`

  return (
    <motion.div
      onMouseEnter={() => setLift(true)}
      onMouseLeave={() => setLift(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: cardBg,
        borderRadius: '20px',
        padding: svc.span === 'wide' ? '28px 32px' : '26px 26px',
        boxShadow: shadow,
        transform: lift ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform .22s cubic-bezier(.34,1.4,.64,1), box-shadow .22s ease, background .18s ease',
        gridColumn: svc.span === 'wide' ? 'span 2' : 'span 1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow on hover */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 160, height: 160, borderRadius: '50%',
        background: a.glow,
        filter: 'blur(50px)',
        opacity: lift ? 1 : 0,
        transition: 'opacity .3s ease',
        pointerEvents: 'none',
      }} />

      {/* Diagonal grain texture line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(255,255,255,.012) 2px, rgba(255,255,255,.012) 4px)`,
        borderRadius: '20px',
        pointerEvents: 'none',
      }} />

      {svc.span === 'wide' ? (
        /* Wide card */
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: isLight ? 'rgba(201,147,58,.08)' : a.iconBg, border: `1px solid ${isLight ? 'rgba(0,0,0,.08)' : `${a.border}33`}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svc.icon size={22} color={a.icon} />
          </div>
          <div style={{ flex: 1 }}>
            {svc.tag && (
              <span style={{
                display: 'inline-block', fontSize: 9.5, fontWeight: 600,
                letterSpacing: '.1em', textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: 100,
                background: a.tag, color: a.tagText,
                border: `1px solid ${a.border}44`,
                marginBottom: 10,
              }}>
                {svc.tag}
              </span>
            )}
            <h3 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 22, fontWeight: 500,
              color: isLight ? '#1f1f1f' : '#f5f0e8', marginBottom: 8, lineHeight: 1.2,
            }}>{svc.title}</h3>
            <p style={{ fontSize: 13, color: isLight ? 'rgba(44,44,44,.72)' : 'rgba(245,240,232,.55)', lineHeight: 1.72 }}>{svc.description}</p>
            {svc.stats && (
              <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
                {svc.stats.map(s => (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: 36, fontWeight: 400, color: a.stat, lineHeight: 1,
                    }}>{s.value}</div>
                    <div style={{
                      fontFamily: 'Inter,sans-serif',
                      fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase',
                      color: isLight ? 'rgba(44,44,44,.55)' : 'rgba(245,240,232,.35)', marginTop: 4,
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Normal card */
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: isLight ? 'rgba(201,147,58,.08)' : a.iconBg, border: `1px solid ${isLight ? 'rgba(0,0,0,.08)' : `${a.border}33`}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <svc.icon size={20} color={a.icon} />
          </div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 19, fontWeight: 500,
            color: isLight ? '#1f1f1f' : '#f5f0e8', marginBottom: 8, lineHeight: 1.25,
          }}>{svc.title}</h3>
          <p style={{ fontSize: 12.5, color: isLight ? 'rgba(44,44,44,.72)' : 'rgba(245,240,232,.52)', lineHeight: 1.72 }}>{svc.description}</p>
          {svc.pills && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
              {svc.pills.map(p => (
                <span key={p} style={{
                  fontSize: 10.5, fontWeight: 500,
                  padding: '4px 12px', borderRadius: 100,
                  background: a.pill, color: a.pillText,
                  border: `1px solid ${a.border}33`,
                  letterSpacing: '.04em',
                }}>
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────
export function ServicesSection() {
  const { theme } = useThemeStore()
  const isLight = theme === 'light'
  const sectionBg = isLight ? '#faf8f4' : '#080808'

  return (
    <section className="section-padding" style={{ background: sectionBg, position: 'relative', overflow: 'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');`}</style>

      {/* Background radial glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,147,58,.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: 'Inter,sans-serif',
            fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase',
            color: '#c9933a', marginBottom: 10,
          }}>
            What we offer
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 42, fontWeight: 300,
            color: isLight ? '#1f1f1f' : '#f5f0e8', marginBottom: 10, lineHeight: 1.15,
          }}>
            Our services
          </h2>
          {/* Gold rule */}
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,#c9933a,transparent)', margin: '0 auto 14px' }} />
          <p style={{
            fontFamily: 'Inter,sans-serif',
            fontSize: 13, color: isLight ? 'rgba(44,44,44,.66)' : 'rgba(245,240,232,.38)',
            maxWidth: 360, margin: '0 auto', lineHeight: 1.7,
          }}>
            Comprehensive design solutions tailored to residential and commercial spaces.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {services.map((svc, i) => (
            <ClayCard key={svc.id} svc={svc} delay={i * 0.06} theme={theme} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <MagneticButton to={ROUTES.services} variant="outline">
            Explore all services
          </MagneticButton>
        </div>

      </div>
    </section>
  )
}