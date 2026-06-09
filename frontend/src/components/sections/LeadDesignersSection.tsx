import { useRef } from 'react'
import { motion } from 'framer-motion'
import { leadDesigners } from '@/data/team'

export function LeadDesignersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-primary px-10 py-20 dark:bg-[#0a0a0a]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-48 -right-48 -top-48 h-[600px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(180,140,100,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Heading */}
      <p className="mb-3 text-center text-[10px] uppercase tracking-[0.35em] text-brown/70 dark:text-[#8a7560]">
        Lead Designers
      </p>
      <h2
        className="mb-16 text-center text-[52px] font-light leading-[1.1] tracking-[-0.01em] text-charcoal dark:text-[#f0ebe3]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        The Visionaries Behind
        <br />
        <em className="italic text-brown dark:text-[#c9a97a]">Every Space</em>
      </h2>

      {/* Grid */}
      <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-[2px]">
        {leadDesigners.map((designer, i) => (
          <DesignerCard key={designer.id} designer={designer} index={i} />
        ))}
      </div>
    </section>
  )
}

function DesignerCard({ designer, index }: { designer: (typeof leadDesigners)[0]; index: number }) {
  const innerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = innerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
    el.style.transition = ''
  }

  const handleMouseLeave = () => {
    const el = innerRef.current
    if (!el) return
    el.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }

  const bgClass =
    index % 2 === 0
      ? 'bg-gradient-to-br from-[#e8dfd4] via-[#d4c4a8] to-[#f0ebe3] dark:from-[#1a1510] dark:via-[#2c1f0e] dark:to-[#0d0d0d]'
      : 'bg-gradient-to-br from-[#dde4ea] via-[#c8d4de] to-[#f0ebe3] dark:from-[#0f1419] dark:via-[#0e1e2c] dark:to-[#0d0d0d]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group overflow-hidden bg-cream dark:bg-[#111]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image area */}
      <div ref={innerRef} className="relative" style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
        <div
          className={`absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] ${bgClass}`}
        />

        <div
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.1] dark:opacity-[0.06]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 180,
            color: '#2c2c2c',
            letterSpacing: '-0.05em',
          }}
        >
          {designer.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>

        <div className="absolute left-0 right-0 h-px pointer-events-none">
          <style>{`
            @keyframes scanLine { 0% { top: -5%; } 100% { top: 105%; } }
            .group:hover .scan-line { animation: scanLine 3s ease-in-out infinite; }
          `}</style>
          <div
            className="scan-line absolute left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c9a97a60, transparent)' }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(250,248,244,0.95) 0%, rgba(250,248,244,0.4) 35%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.5) 35%, transparent 65%)',
          }}
        />

        <div
          className="absolute right-7 top-7 text-[13px] tracking-[0.2em] text-charcoal/30 transition-colors duration-400 group-hover:text-brown/70 dark:text-[#8a756050] dark:group-hover:text-[#c9a97a90]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="absolute left-7 top-7 flex -translate-y-2 items-center gap-1.5 opacity-0 transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="h-1.5 w-1.5 rounded-full bg-brown dark:bg-[#c9a97a]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-brown dark:text-[#c9a97a]">
            {designer.experience} experience
          </span>
        </div>

        {[
          'top-4 left-4 border-t border-l',
          'top-4 right-4 border-t border-r',
          'bottom-4 left-4 border-b border-l',
          'bottom-4 right-4 border-b border-r',
        ].map((cls, ci) => (
          <div
            key={ci}
            className={`absolute h-3 w-3 border-brown/40 opacity-0 transition-opacity duration-400 group-hover:opacity-100 dark:border-[#c9a97a60] ${cls}`}
          />
        ))}

        <div className="absolute bottom-0 left-0 right-0 px-8 pb-0">
          <p className="mb-2 translate-y-1 text-[9px] uppercase tracking-[0.3em] text-brown/70 transition-all duration-400 group-hover:translate-y-0 group-hover:text-brown dark:text-[#8a7560] dark:group-hover:text-[#c9a97a]">
            {designer.role}
          </p>
          <h3
            className="text-[48px] leading-[0.95] tracking-[0.03em] text-charcoal transition-all duration-500 group-hover:tracking-[0.05em] dark:text-[#f0ebe3]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {designer.name.split(' ').map((word, wi) => (
              <span key={wi} className="block">
                {word}
              </span>
            ))}
          </h3>
          <div className="mt-2.5 h-px w-0 bg-brown transition-all delay-100 duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full dark:bg-[#c9a97a]" />
        </div>
      </div>

      {/* Info panel */}
      <div className="relative overflow-hidden border-t border-charcoal/[0.06] bg-cream/80 px-8 py-6 dark:border-white/[0.04] dark:bg-[#0f0f0f]">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, rgba(201,169,122,0.08) 0%, transparent 60%)' }}
        />
        <p
          className="mb-4 text-[15px] italic leading-[1.7] text-charcoal/70 transition-colors duration-400 group-hover:text-charcoal dark:text-[#9e9489] dark:group-hover:text-[#c9b89a]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          &ldquo;{designer.philosophy}&rdquo;
        </p>
        <div className="flex items-center gap-2.5">
          <div className="h-px w-5 bg-charcoal/30 transition-all duration-400 group-hover:w-8 group-hover:bg-brown dark:bg-[#8a7560] dark:group-hover:bg-[#c9a97a]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50 transition-colors duration-400 group-hover:text-charcoal/70 dark:text-[#6a6058] dark:group-hover:text-[#8a7560]">
            {designer.specialty}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
