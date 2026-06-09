import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { CONTACT_INFO } from '@/constants/social'
import { SocialLinks } from '@/components/common/SocialLinks'

export function Footer() {
  return (
    <footer className="relative border-t border-charcoal/10 bg-primary dark:border-[#F5F5F5]/10 dark:bg-surface">
      <div className="section-padding container-wide">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-medium">The Design Story</h3>
            <p className="mt-4 max-w-xs font-serif text-sm text-charcoal/70 dark:text-[#F5F5F5]/70">
              Designing timeless interiors where functionality, emotion, and craftsmanship converge.
            </p>
            <SocialLinks className="mt-6" />
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-brown dark:text-brown-light">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to={ROUTES.projects} className="link-underline">Projects</Link></li>
              <li><Link to={ROUTES.videos} className="link-underline">Videos</Link></li>
              <li><Link to={ROUTES.services} className="link-underline">Services</Link></li>
              <li><Link to={ROUTES.about} className="link-underline">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-brown dark:text-brown-light">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/80 dark:text-[#F5F5F5]/80">
              <li>{CONTACT_INFO.address}</li>
              <li><a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a></li>
              <li><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-brown dark:text-brown-light">
              Start a Project
            </h4>
            <p className="mt-4 text-sm text-charcoal/70 dark:text-[#F5F5F5]/70">
              Ready to transform your space? Book a complimentary consultation.
            </p>
            <Link
              to={ROUTES.book}
              className="mt-4 inline-block border-b border-brown pb-1 text-sm font-medium dark:border-brown-light"
              data-cursor="hover"
            >
              Book Appointment →
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-charcoal/10 pt-8 text-xs text-charcoal/50 dark:border-[#F5F5F5]/10 md:flex-row">
          <p>© {new Date().getFullYear()} The Design Story. All rights reserved.</p>
          <p>Crafted with intention in Mumbai</p>
        </div>
      </div>
    </footer>
  )
}
