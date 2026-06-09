import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'interior-design',
    title: 'Interior Design',
    description:
      'End-to-end residential and commercial interior design — from concept to completion, tailored to your lifestyle and aesthetic.',
    icon: 'Home',
    process: ['Discovery session', 'Concept development', 'Design documentation', 'Installation oversight'],
    benefits: ['Cohesive design language', 'Curated material palette', 'Bespoke furniture solutions'],
    relatedProjectIds: ['serene-penthouse', 'coastal-villa'],
  },
  {
    id: 'renovation',
    title: 'Renovation',
    description:
      'Transform existing spaces with structural sensitivity — we honor what works while elevating every detail.',
    icon: 'Hammer',
    process: ['Site assessment', 'Scope planning', 'Phased execution', 'Quality assurance'],
    benefits: ['Minimal disruption planning', 'Value engineering', 'Heritage-aware updates'],
    relatedProjectIds: ['urban-loft', 'artisan-kitchen'],
  },
  {
    id: 'furniture-styling',
    title: 'Furniture Styling',
    description:
      'Custom and curated furniture selections that balance comfort, proportion, and lasting craftsmanship.',
    icon: 'Sofa',
    process: ['Lifestyle analysis', 'Sourcing & sampling', 'Custom commissions', 'Placement styling'],
    benefits: ['Trade-exclusive access', 'Ergonomic planning', 'Investment-grade pieces'],
    relatedProjectIds: ['living-gallery', 'master-retreat'],
  },
  {
    id: 'lighting-design',
    title: 'Lighting Design',
    description:
      'Layered lighting schemes that sculpt mood, highlight architecture, and support daily rituals.',
    icon: 'Lamp',
    process: ['Light study', 'Fixture specification', 'Control integration', 'Scene programming'],
    benefits: ['Energy-efficient solutions', 'Circadian-friendly options', 'Drama without glare'],
    relatedProjectIds: ['serene-penthouse', 'boutique-cafe'],
  },
  {
    id: 'space-planning',
    title: 'Space Planning',
    description:
      'Intelligent layouts that maximize flow, storage, and function without compromising beauty.',
    icon: 'LayoutGrid',
    process: ['Measured survey', 'Option studies', 'Furniture layouts', 'MEP coordination'],
    benefits: ['Optimized circulation', 'Built-in storage', 'Future-flexible zones'],
    relatedProjectIds: ['executive-suite', 'urban-loft'],
  },
  {
    id: 'commercial-design',
    title: 'Commercial Design',
    description:
      'Hospitality, retail, and workplace environments that elevate brand experience and guest comfort.',
    icon: 'Building2',
    process: ['Brand immersion', 'FF&E specification', 'Regulatory compliance', 'Launch support'],
    benefits: ['Memorable guest journeys', 'Operational efficiency', 'Photogenic moments'],
    relatedProjectIds: ['boutique-cafe', 'executive-suite'],
  },
]

export const designProcessSteps = [
  { id: 1, title: 'Discovery', description: 'We listen deeply to understand your lifestyle, aspirations, and spatial needs.' },
  { id: 2, title: 'Consultation', description: 'On-site walkthrough and preliminary direction aligned with your vision.' },
  { id: 3, title: 'Moodboard', description: 'Curated palettes, textures, and references that define the aesthetic language.' },
  { id: 4, title: 'Planning', description: 'Detailed layouts, specifications, and investment roadmap.' },
  { id: 5, title: '3D Visualization', description: 'Photorealistic renders to experience your space before construction.' },
  { id: 6, title: 'Material Selection', description: 'Handpicked finishes, fabrics, and fixtures from our global network.' },
  { id: 7, title: 'Execution', description: 'Meticulous site management with weekly progress updates.' },
  { id: 8, title: 'Final Styling', description: 'The artful layer — accessories, art, and lived-in perfection.' },
]
