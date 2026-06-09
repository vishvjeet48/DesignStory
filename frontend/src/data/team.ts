import type { TeamMember } from '@/types'

const photo = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=600&h=750&q=80`

export const leadDesigners: TeamMember[] = [
  {
    id: 'ananya-sharma',
    name: 'Yogita Oswal',
    role: 'Principal Interior Designer',
    department: 'Design',
    image: photo('1573496359142-b8d87734a5a2'),
    experience: '14 years',
    philosophy:
      'I believe every room should whisper rather than shout — spaces that feel collected over time, never decorated in a day.',
    specialty: 'Residential luxury, material curation, bespoke furniture',
    lead: true,
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: 'rohan-mehta',
    name: 'Gaurav Oswal',
    role: 'Creative Director',
    department: 'Design',
    image: photo('1560250097-0b93528c311a'),
    experience: '12 years',
    philosophy:
      'Design is emotional architecture. We choreograph light, proportion, and texture to tell each client\'s unique narrative.',
    specialty: 'Commercial spaces, 3D visualization, lighting design',
    lead: true,
    social: { instagram: '#', linkedin: '#' },
  },
]

export const fullTeam: TeamMember[] = [
  ...leadDesigners,
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Senior Architect',
    department: 'Architecture',
    image: photo('1580489944761-15a19d654956'),
    bio: 'Licensed architect specializing in spatial planning and building compliance.',
    social: { linkedin: '#' },
  },
  {
    id: 'vikram-singh',
    name: 'Vikram Singh',
    role: '3D Visualizer',
    department: 'Visualization',
    image: photo('1472099645785-5658abf4ff4e'),
    bio: 'Photorealistic renders that bring concepts to life before a single wall is moved.',
    social: { instagram: '#' },
  },
  {
    id: 'meera-kapoor',
    name: 'Meera Kapoor',
    role: 'Interior Stylist',
    department: 'Design',
    image: photo('1438761681033-6461ffad8d80'),
    bio: 'Final styling, art placement, and accessory curation for magazine-ready reveals.',
    social: { instagram: '#' },
  },
  {
    id: 'arjun-desai',
    name: 'Arjun Desai',
    role: 'Project Manager',
    department: 'Operations',
    image: photo('1519085364583-267db028fc82'),
    bio: 'Timeline orchestration and vendor coordination across all active sites.',
    social: { linkedin: '#' },
  },
  {
    id: 'sunita-rao',
    name: 'Sunita Rao',
    role: 'Site Supervisor',
    department: 'Execution',
    image: photo('1544005313-94ddf0286df2'),
    bio: 'On-site quality control ensuring craftsmanship meets our exacting standards.',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Lighting Designer',
    department: 'Design',
    image: photo('1507003211169-0a1dd7228f2d'),
    bio: 'Layered lighting schemes from ambient to accent for every project phase.',
    social: { linkedin: '#' },
  },
  {
    id: 'kavita-joshi',
    name: 'Kavita Joshi',
    role: 'Junior Designer',
    department: 'Design',
    image: photo('1494790108377-be9c29b29330'),
    bio: 'Moodboard development, sample sourcing, and design documentation.',
    social: { instagram: '#' },
  },
]
