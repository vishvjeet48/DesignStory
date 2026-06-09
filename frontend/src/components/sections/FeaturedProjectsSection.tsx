import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, PROJECT_CATEGORIES } from '@/data/projects'
import type { ProjectCategory } from '@/types'
import { ProjectCard } from '@/components/common/ProjectCard'
import { Modal } from '@/components/ui/Modal'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ROUTES } from '@/constants/routes'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

export function FeaturedProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All')
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const filtered =
    category === 'All'
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category === category)

  const display = filtered.length > 0 ? filtered : projects.slice(0, 6)

  return (
    <section className="relative section-padding" id="projects">
      <div className="pointer-events-none absolute right-4 top-8 section-index text-charcoal/[0.04] dark:text-mist/[0.04] md:right-10">02</div>
      <div className="container-wide relative">
        <div className="mb-12 flex flex-col gap-6 border-b border-charcoal/10 pb-12 dark:border-mist/10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.45em] text-brown dark:text-brown-light">Portfolio</span>
            <h2 className="mt-3 font-display text-4xl font-medium text-charcoal dark:text-mist md:text-6xl lg:text-7xl">
              Spaces that <span className="italic text-brown dark:text-brown-light">linger</span>
            </h2>
          </div>
          <p className="max-w-md font-serif text-charcoal/60 dark:text-mist/50">
            A curated collision of texture and light — each project its own strange, beautiful chapter.
          </p>
        </div>
        <div className="mb-10 flex flex-wrap gap-2">
          {(['All', ...PROJECT_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors',
                category === cat
                  ? 'bg-brown text-cream shadow-[0_0_24px_rgba(165,132,98,0.3)] dark:bg-brown-light dark:text-night dark:shadow-[0_0_24px_rgba(198,167,123,0.3)]'
                  : 'border border-charcoal/10 bg-cream/80 text-charcoal/70 hover:border-brown/40 hover:text-charcoal dark:border-mist/10 dark:bg-surface/60 dark:text-mist/70 dark:hover:border-brown-light/40 dark:hover:text-mist'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {display.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setModalProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-12 text-center">
          <MagneticButton to={ROUTES.projects} variant="outline">
            View All Projects
          </MagneticButton>
        </div>
      </div>

      <Modal
        open={!!modalProject}
        onClose={() => setModalProject(null)}
        title={modalProject?.name}
        className="max-w-2xl"
      >
        {modalProject && (
          <div>
            <img
              src={modalProject.image}
              alt={modalProject.name}
              className="mb-4 w-full rounded-sm object-cover"
            />
            <p className="text-sm text-charcoal/70 dark:text-[#F5F5F5]/70">
              {modalProject.style} · {modalProject.location}
            </p>
            <p className="mt-4 font-serif">{modalProject.description}</p>
            <MagneticButton to={ROUTES.project(modalProject.id)} className="mt-6">
              View Full Project
            </MagneticButton>
          </div>
        )}
      </Modal>
    </section>
  )
}
