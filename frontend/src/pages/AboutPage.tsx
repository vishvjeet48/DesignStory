import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ROUTES } from '@/constants/routes'

const team = [
  { id: 1, initials: 'AR', name: 'Ananya Rao',    role: 'Principal Designer', dept: 'Creative',      color: 'bg-emerald-50 text-emerald-700' },
  { id: 2, initials: 'KM', name: 'Karan Mehta',   role: 'Lead Architect',     dept: 'Architecture',  color: 'bg-violet-50 text-violet-700' },
  { id: 3, initials: 'PS', name: 'Priya Sharma',  role: 'Spatial Designer',   dept: 'Interiors',     color: 'bg-orange-50 text-orange-700' },
  { id: 4, initials: 'RJ', name: 'Rohan Joshi',   role: 'Project Manager',    dept: 'Operations',    color: 'bg-amber-50 text-amber-700' },
  { id: 5, initials: 'SN', name: 'Sneha Nair',    role: 'Material Curator',   dept: 'Sourcing',      color: 'bg-pink-50 text-pink-700' },
  { id: 6, initials: 'VD', name: 'Vivek Desai',   role: 'Visual Stylist',     dept: 'Creative',      color: 'bg-lime-50 text-lime-700' },
  { id: 7, initials: 'MP', name: 'Meera Pillai',  role: '3D Visualiser',      dept: 'Tech',          color: 'bg-blue-50 text-blue-700' },
  { id: 8, initials: 'AK', name: 'Aditya Kumar',  role: 'Junior Designer',    dept: 'Interiors',     color: 'bg-stone-100 text-stone-600' },
]

const press = [
  { name: 'Times of India', type: 'Newspaper' },
  { name: 'The Hindu',      type: 'Newspaper' },
  { name: 'Sakal',          type: 'Newspaper' },
  { name: 'Indian Express', type: 'Newspaper' },
  { name: 'Arch. Digest',   type: 'Magazine'  },
  { name: 'Elle Decor',     type: 'Magazine'  },
]

const partners = [
  { name: 'Jaguar',        category: 'Automotive'    },
  { name: 'Finolex',       category: 'Electrical'    },
  { name: 'Kohler',        category: 'Sanitaryware'  },
  { name: 'Asian Paints',  category: 'Paints'        },
  { name: 'Philips',       category: 'Lighting'      },
  { name: 'Godrej Interio',category: 'Furniture'     },
]

const awards = [
  { title: 'AD100 Rising Talent Feature',   org: 'Architectural Digest India',  year: '2024' },
  { title: 'Best Residential Design',       org: 'Elle Decor India Awards',     year: '2024' },
  { title: '15+ International Design Awards', org: 'Various international bodies', year: '2018–24' },
  { title: 'Outstanding Studio of the Year', org: 'Design Week India',           year: '2023' },
  { title: 'Top 10 Emerging Studios',       org: 'India Design Forum',          year: '2022' },
]

const values = [
  { title: 'Integrity',      text: 'Transparent processes and materials you can trust, every time.' },
  { title: 'Craftsmanship',  text: 'Artisan partners who share our obsession with the smallest detail.' },
  { title: 'Timelessness',   text: 'Designs that age gracefully, never chasing fleeting trends.' },
]

export function AboutPage() {
  return (
    <div className="pt-24 divide-y divide-charcoal/10 dark:divide-[#F5F5F5]/10">

      {/* Story + Stats */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-1">Our story</p>
          <h1 className="font-display text-3xl mb-5">A studio built on narrative</h1>
          <p className="font-serif text-[15px] leading-relaxed text-charcoal/70 dark:text-[#F5F5F5]/70 mb-3">
            Founded in Mumbai with a simple belief — every home deserves a soul. From a two-person atelier,
            we've grown into a multidisciplinary team of architects, designers, and craftspeople.
          </p>
          <p className="font-serif text-[15px] leading-relaxed text-charcoal/70 dark:text-[#F5F5F5]/70">
            Over 120 residential and commercial projects across India, each treated as a unique editorial
            story. Intentionally boutique — selective with projects so every space gets our full devotion.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { end: 120, suffix: '+', label: 'Projects' },
              { end: 98,  suffix: '%', label: 'Happy clients' },
              { end: 12,  suffix: '',  label: 'Years experience' },
            ].map((s) => (
              <div key={s.label} className="bg-primary/60 dark:bg-surface/40 rounded-sm p-4 text-center">
                <AnimatedCounter end={s.end} suffix={s.suffix} className="text-3xl font-display" />
                <p className="text-[11px] uppercase tracking-wider text-charcoal/50 dark:text-[#F5F5F5]/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-4">Purpose</p>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { title: 'Mission', body: 'Craft interiors that elevate daily life through thoughtful design, sustainable materials, and enduring beauty.' },
              { title: 'Vision',  body: "India's most trusted editorial interior studio — spaces that feel both luxurious and deeply personal." },
            ].map((mv) => (
              <div key={mv.title} className="border border-charcoal/10 dark:border-[#F5F5F5]/10 rounded-sm p-5">
                <h3 className="font-display text-lg mb-2">{mv.title}</h3>
                <p className="font-serif text-sm text-charcoal/65 dark:text-[#F5F5F5]/65 leading-relaxed">{mv.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-wide">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-1">The team</p>
          <h2 className="font-display text-2xl mb-6">Meet our people</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {team.map((m, i) => (
              <motion.div
                key={m.id}
                className="border border-charcoal/10 dark:border-[#F5F5F5]/10 rounded-sm overflow-hidden group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={`w-full aspect-square flex items-center justify-center text-2xl font-display ${m.color}`}>
                  {m.initials}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-charcoal/55 dark:text-[#F5F5F5]/55 mt-0.5">{m.role}</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal/35 dark:text-[#F5F5F5]/35 mt-0.5">{m.dept}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-4">Principles</p>
          <div className="grid gap-3 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-primary/50 dark:bg-surface/30 rounded-sm p-4">
                <h4 className="font-display text-base mb-1.5">{v.title}</h4>
                <p className="font-serif text-xs text-charcoal/60 dark:text-[#F5F5F5]/60 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-1">Featured in</p>
          <h2 className="font-display text-2xl mb-5">Press & media</h2>
          <div className="flex flex-wrap gap-2.5">
            {press.map((p) => (
              <div
                key={p.name}
                className="flex-1 min-w-[100px] border border-charcoal/10 dark:border-[#F5F5F5]/10 rounded-sm py-3.5 px-3 flex flex-col items-center gap-1.5"
              >
                <span className="font-display text-sm font-medium text-center">{p.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal/40 dark:text-[#F5F5F5]/40">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-1">Partners</p>
          <h2 className="font-display text-2xl mb-5">Trusted brand collaborations</h2>
          <div className="flex flex-wrap gap-2.5">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex-1 min-w-[110px] border border-charcoal/10 dark:border-[#F5F5F5]/10 rounded-sm py-4 px-3 flex flex-col items-center gap-1.5"
              >
                <span className="font-display text-sm font-medium text-center">{p.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal/40 dark:text-[#F5F5F5]/40">{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-[11px] uppercase tracking-widest text-charcoal/40 dark:text-[#F5F5F5]/40 mb-1">Recognition</p>
          <h2 className="font-display text-2xl mb-5">Awards & achievements</h2>
          <div className="flex flex-col gap-2.5">
            {awards.map((a) => (
              <div
                key={a.title}
                className="flex items-center gap-4 border border-charcoal/10 dark:border-[#F5F5F5]/10 rounded-sm px-4 py-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-charcoal/50 dark:text-[#F5F5F5]/50 mt-0.5">{a.org}</p>
                </div>
                <span className="text-xs bg-primary dark:bg-surface rounded-sm px-2.5 py-1 text-charcoal/55 dark:text-[#F5F5F5]/55 shrink-0">
                  {a.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-wide max-w-xl">
          <p className="font-serif text-[15px] text-charcoal/65 dark:text-[#F5F5F5]/65 mb-6 leading-relaxed">
            Editorial sensibility, end-to-end execution, and a client experience that feels calm,
            collaborative, and genuinely luxurious.
          </p>
          <MagneticButton to={ROUTES.book}>Start your project</MagneticButton>
        </div>
      </section>

    </div>
  )
}