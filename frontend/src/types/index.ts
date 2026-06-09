export type ProjectCategory =
  | 'Living Rooms'
  | 'Bedrooms'
  | 'Kitchens'
  | 'Offices'
  | 'Cafes'
  | 'Villas'
  | 'Apartments'

export type VideoCategory =
  | 'Home Tours'
  | 'Transformations'
  | 'Behind The Scenes'
  | 'Client Walkthroughs'
  | 'Design Tips'

export interface Project {
  id: string
  name: string
  style: string
  location: string
  category: ProjectCategory
  image: string
  images: string[]
  beforeImage: string
  afterImage: string
  area: string
  timeline: string
  description: string
  challenges: string[]
  results: string[]
  videoUrl?: string
  featured?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  image: string
  bio?: string
  experience?: string
  philosophy?: string
  specialty?: string
  social?: { instagram?: string; linkedin?: string }
  lead?: boolean
}

export interface VideoItem {
  id: string
  title: string
  projectName: string
  category: VideoCategory
  thumbnail: string
  url: string
  duration: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  process: string[]
  benefits: string[]
  relatedProjectIds: string[]
}

export interface Testimonial {
  id: string
  name: string
  projectType: string
  rating: number
  text: string
  image: string
}

export interface MoodboardItem {
  id: string
  title: string
  image: string
  tag: string
}

export interface ProcessStep {
  id: number
  title: string
  description: string
}

export type SortOption = 'newest' | 'oldest' | 'name'
