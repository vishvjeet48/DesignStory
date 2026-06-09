import {
  Home,
  Hammer,
  Sofa,
  Lamp,
  LayoutGrid,
  Building2,
  type LucideIcon,
} from 'lucide-react'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ProjectCard } from '@/components/common/ProjectCard'
import { ROUTES } from '@/constants/routes'

const iconMap: Record<string, LucideIcon> = {
  Home,
  Hammer,
  Sofa,
  Lamp,
  LayoutGrid,
  Building2,
}

export function ServicesPage() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Expertise"
            title="Our Services"
            subtitle="Detailed design solutions for discerning residential and commercial clients."
            align="center"
          />
          <div className="space-y-20">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Home
              const related = projects.filter((p) =>
                service.relatedProjectIds.includes(p.id)
              )
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 border-b border-charcoal/10 pb-20 last:border-0 dark:border-[#F5F5F5]/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand/80 dark:bg-surface">
                      <Icon className="h-6 w-6 text-brown dark:text-brown-light" />
                    </div>
                    <div>
                      <h2 className="font-display text-3xl">{service.title}</h2>
                      <p className="mt-4 max-w-3xl font-serif text-charcoal/75 dark:text-[#F5F5F5]/75">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-brown dark:text-brown-light">
                        Process
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {service.process.map((step) => (
                          <li key={step}>· {step}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-brown dark:text-brown-light">
                        Benefits
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {service.benefits.map((b) => (
                          <li key={b}>· {b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {related.length > 0 && (
                    <div className="mt-10">
                      <h3 className="mb-4 text-sm uppercase tracking-widest">Related Projects</h3>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {related.map((p, i) => (
                          <ProjectCard key={p.id} project={p} index={i} />
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
          <div className="mt-16 text-center">
            <MagneticButton to={ROUTES.book}>Book a Consultation</MagneticButton>
          </div>
        </div>
      </section>
    </div>
  )
}
