import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
)
const VideosPage = lazy(() => import('@/pages/VideosPage').then((m) => ({ default: m.VideosPage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const BookAppointmentPage = lazy(() =>
  import('@/pages/BookAppointmentPage').then((m) => ({ default: m.BookAppointmentPage }))
)

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-24">
      <div className="h-10 w-10 animate-pulse rounded-full border border-brown/30" />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
