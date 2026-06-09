export const ROUTES = {
  home: '/',
  about: '/about',
  projects: '/projects',
  project: (id: string) => `/project/${id}`,
  videos: '/videos',
  services: '/services',
  contact: '/contact',
  book: '/book-appointment',
} as const

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'Projects', path: ROUTES.projects },
  { label: 'Videos', path: ROUTES.videos },
  { label: 'Services', path: ROUTES.services },
  { label: 'About', path: ROUTES.about },
  { label: 'Contact', path: ROUTES.contact },
  { label: 'Book Appointment', path: ROUTES.book },
] as const
