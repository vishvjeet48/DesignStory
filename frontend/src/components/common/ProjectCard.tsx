import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'
import { ROUTES } from '@/constants/routes'

interface ProjectCardProps {
  project: Project
  index?: number
  onClick?: () => void
}

export function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  const heights = ['h-72', 'h-96', 'h-80', 'h-[28rem]', 'h-64']
  const height = heights[index % heights.length]
  const num = String(index + 1).padStart(2, '0')

  const content = (
    <motion.article
      className="group masonry-item relative overflow-hidden rounded-none border border-mist/5 bg-surface transition-all duration-500 hover:border-brown-light/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 5) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative ${height} overflow-hidden`}>
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
        <span className="absolute left-4 top-4 font-display text-4xl text-mist/20 transition-colors group-hover:text-brown-light/40">
          {num}
        </span>
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-mist/20 bg-night/50 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-mist" />
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-brown-light">{project.style}</p>
        <h3 className="mt-1 font-display text-2xl text-mist md:text-3xl">{project.name}</h3>
        <p className="mt-1 text-sm text-mist/50">{project.location}</p>
      </div>
    </motion.article>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full text-left" data-cursor="hover">
        {content}
      </button>
    )
  }

  return (
    <Link to={ROUTES.project(project.id)} data-cursor="hover">
      {content}
    </Link>
  )
}
