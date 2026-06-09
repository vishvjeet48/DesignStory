import type { VideoItem, VideoCategory } from '@/types'

const thumb = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=80`

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'Home Tours',
  'Transformations',
  'Behind The Scenes',
  'Client Walkthroughs',
  'Design Tips',
]

export const videos: VideoItem[] = [
  {
    id: 'v1',
    title: 'Penthouse Reveal',
    projectName: 'Serene Penthouse',
    category: 'Home Tours',
    thumbnail: thumb('photo-1618221195710-dd6b41faaea6'),
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    duration: 184,
  },
  {
    id: 'v2',
    title: 'Kitchen Transformation',
    projectName: 'Artisan Kitchen Atelier',
    category: 'Transformations',
    thumbnail: thumb('photo-1556912173-3bb406ef7e77'),
    url: 'https://www.youtube.com/watch?v=ndHwgBs8J3Y',
    duration: 142,
  },
  {
    id: 'v3',
    title: 'Behind the Moodboard',
    projectName: 'Coastal Villa Retreat',
    category: 'Behind The Scenes',
    thumbnail: thumb('photo-1600210492486-724fe5c67fb0'),
    url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    duration: 96,
  },
  {
    id: 'v4',
    title: 'Client Walkthrough',
    projectName: 'Master Suite Retreat',
    category: 'Client Walkthroughs',
    thumbnail: thumb('photo-1616594039964-ae9021a400a0'),
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    duration: 210,
  },
  {
    id: 'v5',
    title: 'Choosing Warm Neutrals',
    projectName: 'Design Tips',
    category: 'Design Tips',
    thumbnail: thumb('photo-1600607687939-ce8a6c25118c'),
    url: 'https://www.youtube.com/watch?v=EngW7tLk6R8',
    duration: 78,
  },
  {
    id: 'v6',
    title: 'Villa Tour — Goa',
    projectName: 'Coastal Villa Retreat',
    category: 'Home Tours',
    thumbnail: thumb('photo-1600607687640-4e8b83f09088'),
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    duration: 256,
  },
  {
    id: 'v7',
    title: 'Office Before & After',
    projectName: 'Executive Suite Office',
    category: 'Transformations',
    thumbnail: thumb('photo-1497366216548-37526070297c'),
    url: 'https://www.youtube.com/watch?v=ndHwgBs8J3Y',
    duration: 165,
  },
  {
    id: 'v8',
    title: 'Material Selection Day',
    projectName: 'Studio Process',
    category: 'Behind The Scenes',
    thumbnail: thumb('photo-1616486338812-3dadae4b4ace'),
    url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    duration: 120,
  },
]
