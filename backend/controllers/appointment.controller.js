const Appointment = require('../schemas/appointment.schema')

function validatePayload(body) {
  const errors = []

  if (!['client', 'vendor'].includes(body.formType)) {
    errors.push('formType must be client or vendor')
  }
  if (!body.name?.trim()) errors.push('name is required')
  if (!body.email?.includes('@')) errors.push('valid email is required')
  if (!body.phone || body.phone.length < 8) errors.push('valid phone is required')
  if (!body.date) errors.push('preferred date is required')
  if (!body.time) errors.push('preferred time is required')

  if (body.formType === 'client') {
    if (!body.propertyType?.trim()) errors.push('property type is required')
    if (!body.details?.trim()) errors.push('project details are required')
  }

  if (body.formType === 'vendor') {
    if (!body.company?.trim()) errors.push('company name is required')
    if (!body.category?.trim()) errors.push('category is required')
    if (!body.message?.trim()) errors.push('message is required')
  }

  return errors
}

exports.createAppointment = async (req, res) => {
  try {
    const errors = validatePayload(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(', ') })
    }

    const { formType, name, email, phone, date, time } = req.body

    const payload = {
      formType,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredDate: date,
      preferredTime: time,
      status: 'pending',
    }

    if (formType === 'client') {
      payload.propertyType = req.body.propertyType?.trim()
      payload.details = req.body.details?.trim()
    } else {
      payload.company = req.body.company?.trim()
      payload.category = req.body.category?.trim()
      payload.portfolio = req.body.portfolio?.trim() || undefined
      payload.message = req.body.message?.trim()
    }

    const appointment = await Appointment.create(payload)

    return res.status(201).json({
      success: true,
      message: 'Appointment submitted successfully',
      data: appointment,
    })
  } catch (error) {
    console.error('Create appointment error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to save appointment',
    })
  }
}

exports.getAppointments = async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 })
    return res.json({ success: true, data: appointments })
  } catch (error) {
    console.error('Get appointments error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
    })
  }
}
