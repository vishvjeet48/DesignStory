import { HeroSection } from '@/components/sections/HeroSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { LeadDesignersSection } from '@/components/sections/LeadDesignersSection'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { DesignProcessSection } from '@/components/sections/DesignProcessSection'
import { VideoPreviewSection } from '@/components/sections/VideoPreviewSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { MoodboardSection } from '@/components/sections/MoodboardSection'
import { ContactCTASection } from '@/components/sections/ContactCTASection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <LeadDesignersSection />
      <FeaturedProjectsSection />
      <BeforeAfterSection />
      <ServicesSection />
      <DesignProcessSection />
      <VideoPreviewSection />
      <TestimonialsSection />
      <MoodboardSection />
      <ContactCTASection />
    </>
  )
}
