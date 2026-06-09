import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { projects } from '@/data/projects'

export function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const isDragging = useRef(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const project = projects[activeIndex]

  const toPercent = useCallback((clientX: number) => {
    if (!sliderRef.current) return 50
    const { left, width } = sliderRef.current.getBoundingClientRect()
    return Math.max(2, Math.min(98, ((clientX - left) / width) * 100))
  }, [])

  const getClientX = (e: React.MouseEvent | React.TouchEvent) =>
    'touches' in e ? e.touches[0].clientX : e.clientX

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true
    setSliderPos(toPercent(getClientX(e)))
    e.preventDefault()
  }
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging.current) setSliderPos(toPercent(getClientX(e)))
  }
  const handlePointerUp = () => { isDragging.current = false }

  const navigate = (dir: 1 | -1) => {
    setActiveIndex(i => i + dir)
    setSliderPos(50)
  }

  return (
    <section className="section-padding bg-sand/30 dark:bg-surface/50">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Transformations"
          title="Before & After"
          subtitle="Witness the evolution — drag to reveal the transformation."
          align="center"
        />

        {/* Slider */}
        <div className="mx-auto max-w-4xl">
          <div
            ref={sliderRef}
            className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-luxury-lg cursor-col-resize select-none"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            {/* After (base layer — always full width) */}
            <img
              src={project.afterImage}
              alt="After renovation"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />

            {/* Before (clipped on the left) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={project.beforeImage}
                alt="Before renovation"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              />
            </div>

            {/* Divider line */}
            <div
              className="absolute inset-y-0 w-px bg-white pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md gap-0.5">
                <ChevronLeft className="w-3.5 h-3.5 text-charcoal" />
                <ChevronRight className="w-3.5 h-3.5 text-charcoal" />
              </div>
            </div>

            {/* Labels */}
            <span className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/45 text-white text-[10px] uppercase tracking-widest pointer-events-none">
              Before
            </span>
            <span className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-black/45 text-white text-[10px] uppercase tracking-widest pointer-events-none">
              After
            </span>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => navigate(-1)}
              disabled={activeIndex === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-charcoal/20 hover:bg-charcoal/5 disabled:opacity-25 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="font-serif text-sm text-charcoal/50 dark:text-white/50">
              {activeIndex + 1} / {projects.length}
            </span>

            <button
              onClick={() => navigate(1)}
              disabled={activeIndex === projects.length - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-charcoal/20 hover:bg-charcoal/5 disabled:opacity-25 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Meta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="grid gap-6 md:grid-cols-2 mt-8 pt-8 border-t border-charcoal/10 dark:border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h4 className="font-display text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-3">
                  Results Achieved
                </h4>
                <ul className="space-y-1.5 font-serif text-sm text-charcoal/70 dark:text-white/70">
                  {project.results.map((r) => (
                    <li key={r}>– {r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-3">
                  {project.name}
                </h4>
                <p className="font-serif text-sm text-charcoal/70 dark:text-white/70 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}