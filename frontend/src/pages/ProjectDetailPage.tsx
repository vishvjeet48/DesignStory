import { useParams, Link } from 'react-router-dom'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import ReactPlayer from 'react-player/lazy'
import { getProjectById, getRelatedProjects } from '@/data/projects'
import { ProjectCard } from '@/components/common/ProjectCard'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ROUTES } from '@/constants/routes'
import { Star } from 'lucide-react'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined
  const related = id ? getRelatedProjects(id) : []

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-24">
        <h1 className="font-display text-3xl">Project not found</h1>
        <MagneticButton to={ROUTES.projects} className="mt-6">
          Back to Projects
        </MagneticButton>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={project.images[0]}
          alt={project.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <p className="text-xs uppercase tracking-widest text-cream/80">{project.category}</p>
          <h1 className="font-display text-4xl text-cream md:text-6xl">{project.name}</h1>
          <p className="mt-2 text-cream/80">{project.location}</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-wide grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-serif text-lg leading-relaxed text-charcoal/80 dark:text-[#F5F5F5]/80">
              {project.description}
            </p>
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-brown dark:text-brown-light">Location</dt>
              <dd className="mt-1 font-medium">{project.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-brown dark:text-brown-light">Area</dt>
              <dd className="mt-1 font-medium">{project.area}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-brown dark:text-brown-light">Timeline</dt>
              <dd className="mt-1 font-medium">{project.timeline}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-brown dark:text-brown-light">Style</dt>
              <dd className="mt-1 font-medium">{project.style}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <h2 className="mb-8 font-display text-3xl">Gallery</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.images.map((img) => (
              <img
                key={img}
                src={img}
                alt={project.name}
                className="aspect-[4/3] w-full rounded-sm object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand/20 dark:bg-surface/30">
        <div className="container-wide">
          <h2 className="mb-8 text-center font-display text-3xl">Before & After</h2>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-sm shadow-luxury-lg">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage src={project.beforeImage} alt="Before" />
              }
              itemTwo={
                <ReactCompareSliderImage src={project.afterImage} alt="After" />
              }
              className="aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      {project.videoUrl && (
        <section className="section-padding pt-0">
          <div className="container-wide">
            <h2 className="mb-8 font-display text-3xl">Video Walkthrough</h2>
            <div className="aspect-video overflow-hidden rounded-sm">
              <ReactPlayer url={project.videoUrl} width="100%" height="100%" controls />
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-wide grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Design Challenges</h2>
            <ul className="mt-4 space-y-2 font-serif text-charcoal/75 dark:text-[#F5F5F5]/75">
              {project.challenges.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm bg-primary p-8 dark:bg-surface">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brown text-brown" />
              ))}
            </div>
            <p className="mt-4 font-serif italic">
              &ldquo;The team exceeded every expectation. Our {project.category.toLowerCase()} now feels
              like a permanent retreat — thoughtful, warm, and utterly us.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium">— Private Client</p>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-charcoal/10 dark:border-[#F5F5F5]/10">
        <div className="container-wide">
          <h2 className="mb-8 font-display text-3xl">Related Projects</h2>
          <div className="masonry-grid">
            {related.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
          <div className="mt-8">
            <Link to={ROUTES.projects} className="link-underline text-sm uppercase tracking-wider">
              ← All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
