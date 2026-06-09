export type AppointmentFormType = 'client' | 'vendor'

export interface ClientAppointmentPayload {
  formType: 'client'
  name: string
  email: string
  phone: string
  date: string
  time: string
  propertyType: string
  details: string
}

export interface VendorAppointmentPayload {
  formType: 'vendor'
  name: string
  email: string
  phone: string
  date: string
  time: string
  company: string
  category: string
  portfolio?: string
  message: string
}

export type AppointmentPayload = ClientAppointmentPayload | VendorAppointmentPayload

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function submitAppointment(payload: AppointmentPayload) {
  const response = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit appointment')
  }

  return data
}
