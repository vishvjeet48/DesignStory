import type { Project, ProjectCategory } from '@/types'

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Living Rooms',
  'Bedrooms',
  'Kitchens',
  'Offices',
  'Cafes',
  'Villas',
  'Apartments',
]

export const projects: Project[] = [
  {
    id: 'serene-penthouse',
    name: 'Serene Penthouse',
    style: 'Contemporary Warm Minimalism',
    location: 'Mumbai, India',
    category: 'Apartments',
    image: img('photo-1618221195710-dd6b41faaea6', 900),
    images: [
      img('photo-1618221195710-dd6b41faaea6', 1200),
      img('photo-1600210492486-724fe5c67fb0', 1200),
      img('photo-1600607687939-ce8a6c25118c', 1200),
      img('photo-1600566753190-17f0baa2a6c3', 1200),
    ],
    beforeImage: img('photo-1560448204-e02f11c3d0e2', 1000),
    afterImage: img('photo-1618221195710-dd6b41faaea6', 1000),
    area: '3,200 sq ft',
    timeline: '14 weeks',
    description:
      'A sun-drenched penthouse transformed into a sanctuary of calm — layered textures, bespoke joinery, and a palette drawn from natural stone and warm oak.',
    challenges: [
      'Maximizing natural light while preserving privacy',
      'Integrating smart home systems without visual clutter',
    ],
    results: [
      '40% increase in perceived spatial volume',
      'Custom millwork throughout living and dining zones',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    featured: true,
  },
  {
    id: 'coastal-villa',
    name: 'Coastal Villa Retreat',
    style: 'Organic Coastal Luxe',
    location: 'Goa, India',
    category: 'Villas',
    image: img('photo-1600210492486-724fe5c67fb0', 900),
    images: [
      img('photo-1600210492486-724fe5c67fb0', 1200),
      img('photo-1600607687640-4e8b83f09088', 1200),
      img('photo-1616486338812-3dadae4b4ace', 1200),
    ],
    beforeImage: img('photo-1505693416388-ac5ce068fe85', 1000),
    afterImage: img('photo-1600210492486-724fe5c67fb0', 1000),
    area: '5,800 sq ft',
    timeline: '20 weeks',
    description:
      'An open-plan villa celebrating indoor-outdoor living with linen drapery, travertine floors, and artisanal lighting.',
    challenges: ['Salt-air resistant material selection', 'Seamless landscape integration'],
    results: ['Unified indoor-outdoor entertaining flow', 'Sustainable local material sourcing'],
    featured: true,
  },
  {
    id: 'artisan-kitchen',
    name: 'Artisan Kitchen Atelier',
    style: 'Modern European',
    location: 'Bangalore, India',
    category: 'Kitchens',
    image: img('photo-1556912173-3bb406ef7e77', 900),
    images: [
      img('photo-1556912173-3bb406ef7e77', 1200),
      img('photo-1600585154340-be6161a56a0c', 1200),
    ],
    beforeImage: img('photo-1556911220-e15b29be8c8f', 1000),
    afterImage: img('photo-1556912173-3bb406ef7e77', 1000),
    area: '420 sq ft',
    timeline: '8 weeks',
    description:
      'A chef-inspired kitchen with honed marble, brass hardware, and concealed appliance integration.',
    challenges: ['Ventilation in compact urban layout', 'Balancing storage with open sightlines'],
    results: ['Full pantry reconfiguration', 'Statement island with waterfall edge'],
    featured: true,
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite Office',
    style: 'Refined Corporate',
    location: 'Delhi, India',
    category: 'Offices',
    image: img('photo-1497366216548-37526070297c', 900),
    images: [img('photo-1497366216548-37526070297c', 1200), img('photo-1497366811453-902241ed8b72', 1200)],
    beforeImage: img('photo-1497366754035-f200968a6e72', 1000),
    afterImage: img('photo-1497366216548-37526070297c', 1000),
    area: '2,100 sq ft',
    timeline: '10 weeks',
    description: 'A corner executive suite balancing authority with approachability through warm woods and sculptural lighting.',
    challenges: ['Acoustic privacy for video calls', 'Brand identity integration'],
    results: ['Biophilic breakout zone', 'Custom conference table in walnut'],
    featured: false,
  },
  {
    id: 'boutique-cafe',
    name: 'Maison Café',
    style: 'Parisian Bistro',
    location: 'Pune, India',
    category: 'Cafes',
    image: img('photo-1554118811-1e0d58224f24', 900),
    images: [img('photo-1554118811-1e0d58224f24', 1200)],
    beforeImage: img('photo-1445116572660-236099ec97a0', 1000),
    afterImage: img('photo-1554118811-1e0d58224f24', 1000),
    area: '1,400 sq ft',
    timeline: '12 weeks',
    description: 'Intimate café interiors with terrazzo floors, velvet banquettes, and gallery lighting.',
    challenges: ['High-traffic durability', 'Evening ambiance control'],
    results: ['Instagram-worthy focal bar', 'Flexible seating for 48 covers'],
    featured: false,
  },
  {
    id: 'master-retreat',
    name: 'Master Suite Retreat',
    style: 'Soft Luxe',
    location: 'Hyderabad, India',
    category: 'Bedrooms',
    image: img('photo-1616594039964-ae9021a400a0', 900),
    images: [
      img('photo-1616594039964-ae9021a400a0', 1200),
      img('photo-1615529326339-5d379818c579', 1200),
    ],
    beforeImage: img('photo-1505693416388-ac5ce068fe85', 1000),
    afterImage: img('photo-1616594039964-ae9021a400a0', 1000),
    area: '680 sq ft',
    timeline: '6 weeks',
    description: 'A restful master suite with upholstered headboard wall, walk-in wardrobe, and spa-inspired ensuite.',
    challenges: ['Limited natural light on north face'],
    results: ['Layered lighting plan with dim-to-warm', 'Custom wardrobe with jewelry drawer'],
    featured: true,
  },
  {
    id: 'living-gallery',
    name: 'Gallery Living Room',
    style: 'Eclectic Collector',
    location: 'Chennai, India',
    category: 'Living Rooms',
    image: img('photo-1600607687939-ce8a6c25118c', 900),
    images: [img('photo-1600607687939-ce8a6c25118c', 1200), img('photo-1600566753190-17f0baa2a6c3', 1200)],
    beforeImage: img('photo-1586023492125-27b2c045efd7', 1000),
    afterImage: img('photo-1600607687939-ce8a6c25118c', 1000),
    area: '890 sq ft',
    timeline: '9 weeks',
    description: 'Living room designed as an art gallery — neutral envelope allowing collected pieces to shine.',
    challenges: ['Display lighting for varied media', 'Acoustic comfort with high ceilings'],
    results: ['Picture rail system with adjustable spots', 'Hidden media wall'],
    featured: false,
  },
  {
    id: 'urban-loft',
    name: 'Urban Loft Living',
    style: 'Industrial Chic',
    location: 'Mumbai, India',
    category: 'Apartments',
    image: img('photo-1600566753190-17f0baa2a6c3', 900),
    images: [img('photo-1600566753190-17f0baa2a6c3', 1200)],
    beforeImage: img('photo-1502672260266-1c1ef2d93688', 1000),
    afterImage: img('photo-1600566753190-17f0baa2a6c3', 1000),
    area: '1,850 sq ft',
    timeline: '11 weeks',
    description: 'Exposed brick, steel-framed glazing, and curated vintage finds define this loft conversion.',
    challenges: ['Heritage building restrictions', 'Open-plan HVAC zoning'],
    results: ['Mezzanine home office', 'Restored original windows'],
    featured: false,
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getRelatedProjects(id: string, limit = 3): Project[] {
  const current = getProjectById(id)
  if (!current) return projects.slice(0, limit)
  return projects.filter((p) => p.id !== id && p.category === current.category).slice(0, limit)
}
