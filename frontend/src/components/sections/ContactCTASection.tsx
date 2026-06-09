import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/common/MagneticButton'
import { Marquee } from '@/components/common/Marquee'
import { ROUTES } from '@/constants/routes'

export function ContactCTASection() {
  return (
    <section className="relative overflow-hidden">
      <Marquee
        items={['BEGIN', 'YOUR', 'STORY', 'TODAY']}
        className="border-t border-mist/10 bg-surface py-3 font-display text-5xl uppercase tracking-tighter text-mist/[0.07] md:text-7xl"
        speed="fast"
      />
      <motion.div
        className="relative min-h-[70vh] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-[#0a0a0a]/75" />

        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center md:px-16">
          <motion.span
            className="mb-6 text-[10px] uppercase tracking-[0.5em] text-brown-light"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The next chapter is yours
          </motion.span>
          <h2 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1.05] text-mist">
            Let&apos;s design your{' '}
            <span className="hero-gradient-text italic">dream space.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-serif text-lg text-mist/55">
            A complimentary consultation — no pressure, only possibility.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <MagneticButton to={ROUTES.book} className="hero-cta-primary">
              Book Consultation
            </MagneticButton>
            <MagneticButton
              to={ROUTES.contact}
              variant="outline"
              className="border-mist/30 text-mist hover:border-brown-light"
            >
              Contact Us
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
