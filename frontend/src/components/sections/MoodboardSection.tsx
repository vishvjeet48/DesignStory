import { motion } from 'framer-motion'
import { moodboardItems } from '@/data/moodboard'
import { SectionHeading } from '@/components/common/SectionHeading'

export function MoodboardSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Inspiration"
          title="Design Moodboard"
          subtitle="Textures, palettes, and references that shape our aesthetic language."
          align="center"
        />
        <div className="masonry-grid">
          {moodboardItems.map((item, i) => (
            <motion.figure
              key={item.id}
              className="masonry-item group relative overflow-hidden rounded-sm"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest text-cream/80">{item.tag}</span>
                <span className="font-display text-lg text-cream">{item.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
