export const WHATSAPP_NUMBER = '919876543210'
export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello The Design Story! I would like to schedule a design consultation.'
)

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  { name: 'Pinterest', url: 'https://pinterest.com', icon: 'pinterest' },
  { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
] as const

export const CONTACT_INFO = {
  address: '12 Design District, Bandra West, Mumbai 400050',
  phone: '+91 98765 43210',
  email: 'hello@thedesignstory.com',
  hours: 'Mon – Sat, 10:00 AM – 7:00 PM',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8264!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNDknMzUuMCJF!5e0!3m2!1sen!2sin!4v1',
} as const
