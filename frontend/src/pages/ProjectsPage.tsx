import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { projects, PROJECT_CATEGORIES } from '@/data/projects'
import type { ProjectCategory, SortOption } from '@/types'
import { ProjectCard } from '@/components/common/ProjectCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All')
  const [sort, setSort] = useState<SortOption>('newest')
  const [visibleCount, setVisibleCount] = useState(8)

  const filtered = useMemo(() => {
    let list = [...projects]
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q)
      )
    }
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [search, category, sort])

  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Portfolio"
            title="Our Projects"
            subtitle="Explore our complete collection of residential and commercial interiors."
          />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-sm border border-charcoal/15 bg-primary/50 px-4 py-3 text-sm dark:border-[#F5F5F5]/15 dark:bg-surface"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {(['All', ...PROJECT_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors',
                  category === cat
                    ? 'bg-brown text-cream dark:bg-brown-light dark:text-dark'
                    : 'bg-sand/50 dark:bg-surface'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="masonry-grid">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 6)}
                className="rounded-sm border border-charcoal/20 px-8 py-3 text-sm uppercase tracking-wider transition-colors hover:border-brown dark:border-[#F5F5F5]/20"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
