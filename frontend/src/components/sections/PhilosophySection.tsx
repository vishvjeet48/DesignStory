import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/animations/gsap'
const pillars = [
  {
    num: '01',
    title: 'Philosophy',
    text: 'Interiors should feel collected, not decorated — each element earning its place through purpose and beauty.',
  },
  {
    num: '02',
    title: 'Vision',
    text: 'Spaces that outlive trends, nurturing wellbeing through proportion, light, and honest materials.',
  },
  {
    num: '03',
    title: 'Approach',
    text: 'A collaborative, editorial process — listening first, then layering texture, craft, and narrative.',
  },
]

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.philosophy-card').forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary py-0 dark:bg-night">
      <div className="section-padding relative">
        <div className="absolute right-0 top-20 font-display text-[12rem] font-medium leading-none text-charcoal/[0.04] dark:text-mist/[0.03] md:text-[18rem]">
          01
        </div>

        <div className="container-wide relative">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-brown dark:text-brown-light">
                Our Studio
              </span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-charcoal dark:text-mist md:text-6xl lg:text-7xl">
                Where design meets{' '}
                <span className="italic text-brown dark:text-brown-light">storytelling</span>
              </h2>
            </div>
            <p className="max-w-sm font-serif text-lg text-charcoal/60 dark:text-mist/50">
              An atelier obsessed with the strange beauty of lived-in luxury — never loud, always unforgettable.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <motion.div
              ref={imageRef}
              className="philosophy-card relative lg:col-span-5"
              style={{ y: imageY }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"
                  alt="Studio interior"
                  className="h-[120%] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent dark:from-night" />
              </div>
              <div className="absolute -bottom-4 -right-4 border border-brown/30 bg-cream/90 px-6 py-4 backdrop-blur-md dark:border-brown-light/30 dark:bg-night/90 md:-right-8">
                <p className="font-display text-3xl text-brown dark:text-brown-light">14+</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-mist/50">Years of craft</p>
              </div>
            </motion.div>

            <div className="flex flex-col justify-center gap-6 lg:col-span-7 lg:pl-8">
              {pillars.map((item, i) => (
                <div
                  key={item.title}
                  className="philosophy-card group border border-charcoal/10 bg-cream/60 p-8 backdrop-blur-sm transition-colors hover:border-brown/30 dark:border-mist/10 dark:bg-surface/40 dark:hover:border-brown-light/30 md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-5xl text-charcoal/10 transition-colors group-hover:text-brown/20 dark:text-mist/10 dark:group-hover:text-brown-light/20">
                      {item.num}
                    </span>
                    <h3 className="font-display text-2xl text-charcoal dark:text-mist md:text-3xl">{item.title}</h3>
                  </div>
                  <p className="mt-4 max-w-lg font-serif text-charcoal/65 dark:text-mist/55 md:ml-auto md:text-right md:text-lg">
                    {item.text}
                  </p>
                  {i < pillars.length - 1 && (
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-charcoal/10 to-transparent dark:via-mist/15" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
