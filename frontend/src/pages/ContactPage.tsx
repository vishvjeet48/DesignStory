import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO, WHATSAPP_URL } from '@/constants/social'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SocialLinks } from '@/components/common/SocialLinks'

export function ContactPage() {
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            subtitle="We'd love to hear about your project. Reach out and we'll respond within 24 hours."
            align="center"
          />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-brown dark:text-brown-light" />
                <div>
                  <p className="text-xs uppercase tracking-widest">Address</p>
                  <p className="mt-1 font-serif">{CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-brown dark:text-brown-light" />
                <div>
                  <p className="text-xs uppercase tracking-widest">Phone</p>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="mt-1 block font-serif">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-brown dark:text-brown-light" />
                <div>
                  <p className="text-xs uppercase tracking-widest">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="mt-1 block font-serif">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest">Hours</p>
                <p className="mt-1 font-serif">{CONTACT_INFO.hours}</p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366]"
              >
                WhatsApp Us →
              </a>
              <div>
                <p className="mb-3 text-xs uppercase tracking-widest">Follow Us</p>
                <SocialLinks />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-sm bg-primary/50 p-8 dark:bg-surface/50">
              <Input name="name" placeholder="Your Name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="phone" type="tel" placeholder="Phone" required />
              <Textarea name="message" placeholder="Tell us about your project..." rows={5} required />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="h-[400px] w-full">
        <iframe
          title="Studio location"
          src={CONTACT_INFO.mapEmbed}
          className="h-full w-full border-0 grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Modal open={success} onClose={() => setSuccess(false)} title="Message Sent">
        <p className="font-serif text-charcoal/80 dark:text-[#F5F5F5]/80">
          Thank you for reaching out. Our team will contact you within 24 hours.
        </p>
        <Button className="mt-6" onClick={() => setSuccess(false)}>
          Close
        </Button>
      </Modal>
    </div>
  )
}
