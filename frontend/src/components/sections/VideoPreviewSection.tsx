import { useState } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player/lazy'
import { videos } from '@/data/videos'
import { formatDuration } from '@/lib/utils'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ROUTES } from '@/constants/routes'
import { Modal } from '@/components/ui/Modal'

export function VideoPreviewSection() {
  const featured = videos.slice(0, 3)
  const [activeUrl, setActiveUrl] = useState<string | null>(null)

  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Cinematic"
          title="Project Reels"
          subtitle="Experience our spaces in motion — tours, transformations, and behind-the-scenes."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((video, i) => (
            <motion.button
              key={video.id}
              type="button"
              className="group relative aspect-[9/14] overflow-hidden rounded-sm text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveUrl(video.url)}
              data-cursor="hover"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/30 transition-colors group-hover:bg-charcoal/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 backdrop-blur">
                  <Play className="ml-1 h-6 w-6 text-charcoal" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs text-cream/80">{formatDuration(video.duration)}</span>
                <h3 className="font-display text-lg text-cream">{video.title}</h3>
                <p className="text-sm text-cream/70">{video.projectName}</p>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <MagneticButton to={ROUTES.videos}>View All Videos</MagneticButton>
        </div>
      </div>

      <Modal open={!!activeUrl} onClose={() => setActiveUrl(null)} className="max-w-4xl p-4">
        {activeUrl && (
          <div className="aspect-video overflow-hidden rounded-sm">
            <ReactPlayer url={activeUrl} width="100%" height="100%" controls playing />
          </div>
        )}
      </Modal>
    </section>
  )
}
