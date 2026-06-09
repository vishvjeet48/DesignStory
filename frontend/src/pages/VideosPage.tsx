import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player/lazy'
import { videos, VIDEO_CATEGORIES } from '@/data/videos'
import type { VideoCategory } from '@/types'
import { formatDuration } from '@/lib/utils'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'

export function VideosPage() {
  const [category, setCategory] = useState<VideoCategory | 'All'>('All')
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const filtered = useMemo(
    () => (category === 'All' ? videos : videos.filter((v) => v.category === category)),
    [category]
  )

  const activeVideo = videos.find((v) => v.url === activeUrl)
  const related = activeVideo
    ? videos.filter((v) => v.id !== activeVideo.id && v.category === activeVideo.category).slice(0, 3)
    : []

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Motion"
            title="Project Videos & Reels"
            subtitle="Home tours, transformations, and behind-the-scenes from our studio."
            align="center"
          />
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {(['All', ...VIDEO_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs uppercase tracking-wider',
                  category === cat
                    ? 'bg-brown text-cream dark:bg-brown-light dark:text-dark'
                    : 'bg-sand/50 dark:bg-surface'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((video, i) => (
              <motion.button
                key={video.id}
                type="button"
                className="mb-5 block w-full break-inside-avoid overflow-hidden rounded-sm text-left"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
                onMouseEnter={() => setHoverId(video.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => setActiveUrl(video.url)}
              >
                <div className="relative">
                  {hoverId === video.id ? (
                    <div className="aspect-[9/14] bg-charcoal">
                      <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        playing
                        muted
                        loop
                      />
                    </div>
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20">
                    <Play className="h-10 w-10 text-cream" fill="white" />
                  </div>
                  <span className="absolute right-3 top-3 rounded-sm bg-charcoal/70 px-2 py-1 text-xs text-cream">
                    {formatDuration(video.duration)}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs uppercase text-brown dark:text-brown-light">{video.category}</p>
                  <h3 className="font-display text-lg">{video.title}</h3>
                  <p className="text-sm text-charcoal/60 dark:text-[#F5F5F5]/60">{video.projectName}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Modal open={!!activeUrl} onClose={() => setActiveUrl(null)} className="max-w-4xl p-4">
        {activeUrl && (
          <>
            <div className="aspect-video overflow-hidden rounded-sm">
              <ReactPlayer url={activeUrl} width="100%" height="100%" controls playing />
            </div>
            {related.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-widest">Related</p>
                <div className="grid grid-cols-3 gap-3">
                  {related.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveUrl(v.url)}
                      className="overflow-hidden rounded-sm"
                    >
                      <img src={v.thumbnail} alt={v.title} className="aspect-video object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  )
}
