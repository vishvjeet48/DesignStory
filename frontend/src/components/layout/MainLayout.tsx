import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat'
import { NoiseOverlay } from '@/components/common/NoiseOverlay'
import { AmbientGradient } from '@/components/common/AmbientGradient'
import { useLenis } from '@/hooks/useLenis'
export function MainLayout() {
  const location = useLocation()
  useLenis()

  return (
    <div className="relative min-h-screen">
      <AmbientGradient />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-[2]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
