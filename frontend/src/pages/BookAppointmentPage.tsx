import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'
import { submitAppointment, type AppointmentPayload } from '@/lib/api'

type FormType = 'client' | 'vendor'

const TIME_SLOTS = (() => {
  const slots: { value: string; label: string }[] = []
  for (let hour = 9; hour <= 18; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute > 0) break
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      const hour12 = hour % 12 || 12
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const label = `${hour12}:${String(minute).padStart(2, '0')} ${ampm}`
      slots.push({ value, label })
    }
  }
  return slots
})()

const today = new Date().toISOString().split('T')[0]

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.6 21 3 14.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.2 1l-2.3 2.2z"/>
  </svg>
)
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
  </svg>
)
const NotesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>
  </svg>
)
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v4M8 12v4M16 12v4"/>
  </svg>
)
const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H7a2 2 0 0 0-2 2v5l9.5 9.5a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8L12 2z"/><circle cx="7.5" cy="7.5" r="1"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)

function Field({
  label,
  icon,
  error,
  htmlFor,
  children,
}: {
  label: string
  icon: React.ReactNode
  error?: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-xs font-medium text-charcoal/60 dark:text-[#F5F5F5]/50"
      >
        <span className="text-brown dark:text-brown-light">{icon}</span>
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function BookAppointmentPage() {
  const [formType, setFormType] = useState<FormType>('client')
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = (data: FormData): boolean => {
    const next: Record<string, string> = {}
    if (!(data.get('email') as string)?.includes('@')) next.email = 'Valid email required'
    if ((data.get('phone') as string)?.length < 8) next.phone = 'Valid phone required'
    if (!(data.get('name') as string)?.trim()) next.name = 'Name is required'

    const date = data.get('date') as string
    const time = data.get('time') as string
    if (!date) next.date = 'Preferred date is required'
    else if (date < today) next.date = 'Please choose a future date'
    if (!time) next.time = 'Preferred time is required'

    if (formType === 'vendor' && !(data.get('company') as string)?.trim())
      next.company = 'Company name is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')
    const data = new FormData(e.currentTarget)
    if (!validate(data)) return

    const payload: AppointmentPayload =
      formType === 'client'
        ? {
            formType: 'client',
            name: data.get('name') as string,
            email: data.get('email') as string,
            phone: data.get('phone') as string,
            date: data.get('date') as string,
            time: data.get('time') as string,
            propertyType: data.get('propertyType') as string,
            details: data.get('details') as string,
          }
        : {
            formType: 'vendor',
            name: data.get('name') as string,
            email: data.get('email') as string,
            phone: data.get('phone') as string,
            date: data.get('date') as string,
            time: data.get('time') as string,
            company: data.get('company') as string,
            category: data.get('category') as string,
            portfolio: (data.get('portfolio') as string) || undefined,
            message: data.get('message') as string,
          }

    setSubmitting(true)
    try {
      await submitAppointment(payload)
      setSuccess(true)
      e.currentTarget.reset()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const selectCls =
    'w-full rounded-md border border-charcoal/15 bg-transparent px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-brown dark:border-[#F5F5F5]/15 dark:text-[#F5F5F5] dark:focus:border-brown-light'

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-xl">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-brown dark:text-brown-light">
              Consultation
            </p>
            <h1 className="mb-3 font-serif text-3xl font-light text-charcoal dark:text-[#F5F5F5]">
              Book an Appointment
            </h1>
            <p className="text-sm text-charcoal/50 dark:text-[#F5F5F5]/50">
              We'd love to connect — whether you're a homeowner or a design partner.
            </p>
          </div>

          {/* Tab toggle */}
          <div className="mb-8 flex rounded-lg border border-charcoal/10 p-1 dark:border-[#F5F5F5]/10">
            {(['client', 'vendor'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => { setFormType(type); setErrors({}); setSubmitError('') }}
                className={cn(
                  'flex-1 rounded-md py-2.5 text-sm font-medium transition-all',
                  formType === type
                    ? 'bg-brown text-cream shadow-sm dark:bg-brown-light dark:text-dark'
                    : 'text-charcoal/50 hover:text-charcoal/80 dark:text-[#F5F5F5]/50 dark:hover:text-[#F5F5F5]/80'
                )}
              >
                {type === 'client' ? 'Client' : 'Vendor / Partner'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            key={formType}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-charcoal/10 bg-white/60 p-8 shadow-sm backdrop-blur-sm dark:border-[#F5F5F5]/10 dark:bg-surface/30"
          >
            {formType === 'client' ? (
              <>
                <Field label="Full Name" icon={<UserIcon />} error={errors.name}>
                  <Input name="name" placeholder="Your full name" />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email Address" icon={<MailIcon />} error={errors.email}>
                    <Input name="email" type="email" placeholder="you@email.com" />
                  </Field>
                  <Field label="Phone Number" icon={<PhoneIcon />} error={errors.phone}>
                    <Input name="phone" type="tel" placeholder="+91 98765 43210" />
                  </Field>
                </div>

                <Field label="Property Type" icon={<HomeIcon />}>
                  <select name="propertyType" className={selectCls} required>
                    <option value="">Select property type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Office</option>
                    <option>Commercial</option>
                  </select>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Preferred Date" icon={<CalendarIcon />} htmlFor="client-date" error={errors.date}>
                    <Input id="client-date" name="date" type="date" min={today} required />
                  </Field>
                  <Field label="Preferred Time" icon={<ClockIcon />} htmlFor="client-time" error={errors.time}>
                    <select id="client-time" name="time" className={selectCls} required defaultValue="">
                      <option value="" disabled>
                        Select a time
                      </option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Project Details" icon={<NotesIcon />}>
                  <Textarea name="details" placeholder="Tell us about your space and vision…" rows={4} required />
                </Field>
              </>
            ) : (
              <>
                <Field label="Company Name" icon={<BuildingIcon />} error={errors.company}>
                  <Input name="company" placeholder="Your studio or business" />
                </Field>

                <Field label="Contact Person" icon={<UserIcon />} error={errors.name}>
                  <Input name="name" placeholder="Your full name" />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email Address" icon={<MailIcon />} error={errors.email}>
                    <Input name="email" type="email" placeholder="you@company.com" />
                  </Field>
                  <Field label="Phone Number" icon={<PhoneIcon />} error={errors.phone}>
                    <Input name="phone" type="tel" placeholder="+91 98765 43210" />
                  </Field>
                </div>

                <Field label="Category" icon={<TagIcon />}>
                  <select name="category" className={selectCls} required>
                    <option value="">Select a category</option>
                    <option>Furniture</option>
                    <option>Lighting</option>
                    <option>Materials</option>
                    <option>Contractor</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="Portfolio Link" icon={<LinkIcon />} htmlFor="vendor-portfolio">
                  <Input id="vendor-portfolio" name="portfolio" type="url" placeholder="https://yourportfolio.com" />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Preferred Date" icon={<CalendarIcon />} htmlFor="vendor-date" error={errors.date}>
                    <Input id="vendor-date" name="date" type="date" min={today} required />
                  </Field>
                  <Field label="Preferred Time" icon={<ClockIcon />} htmlFor="vendor-time" error={errors.time}>
                    <select id="vendor-time" name="time" className={selectCls} required defaultValue="">
                      <option value="" disabled>
                        Select a time
                      </option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message" icon={<NotesIcon />} htmlFor="vendor-message">
                  <Textarea id="vendor-message" name="message" placeholder="Tell us about your work and how you'd like to collaborate…" rows={4} required />
                </Field>
              </>
            )}

            {submitError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                {submitError}
              </p>
            )}

            <Button type="submit" className="mt-2 w-full" disabled={submitting}>
              {submitting
                ? 'Submitting…'
                : formType === 'client'
                  ? 'Request Consultation'
                  : 'Book Appointment'}
            </Button>
          </form>
        </div>
      </section>

      <Modal open={success} onClose={() => setSuccess(false)} title="You're all set!">
        <div className="flex flex-col items-center py-2 text-center">
          <span className="mb-4 text-brown dark:text-brown-light">
            <CheckIcon />
          </span>
          <p className="text-sm leading-relaxed text-charcoal/70 dark:text-[#F5F5F5]/70">
            Thank you! Our team will confirm your appointment within{' '}
            <span className="font-medium text-charcoal dark:text-[#F5F5F5]">24 hours</span>{' '}
            via email or phone.
          </p>
          <Button className="mt-6 w-full" onClick={() => setSuccess(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  )
}