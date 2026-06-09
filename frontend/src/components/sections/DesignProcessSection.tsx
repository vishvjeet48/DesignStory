import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/animations/gsap'
import { designProcessSteps } from '@/data/services'
import { SectionHeading } from '@/components/common/SectionHeading'

export function DesignProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !lineRef.current) return

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 0.8,
          ease: 'power3.out',
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="section-padding bg-primary/40 dark:bg-surface/20">
      <div className="container-wide">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Design Process"
          subtitle="A refined eight-step journey from first conversation to final styling."
          align="center"
        />
        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-px bg-brown/30 dark:bg-brown-light/30 md:left-1/2 md:-translate-x-px"
          />
          <div className="space-y-12">
            {designProcessSteps.map((step, i) => (
              <div
                key={step.id}
                className={`process-step relative flex gap-8 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden flex-1 md:block" />
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brown text-sm font-medium text-cream dark:bg-brown-light dark:text-dark md:absolute md:left-1/2 md:-translate-x-1/2">
                  {step.id}
                </div>
                <div
                  className={`flex-1 rounded-sm bg-cream p-6 shadow-glass dark:bg-surface ${
                    i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                  }`}
                >
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70 dark:text-[#F5F5F5]/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
