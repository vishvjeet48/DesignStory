const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ['client', 'vendor'],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'rejected', 'postponed'],
      default: 'pending',
    },
    // Client-only fields
    propertyType: { type: String, trim: true },
    details: { type: String, trim: true },
    // Vendor-only fields
    company: { type: String, trim: true },
    category: { type: String, trim: true },
    portfolio: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Appointment', appointmentSchema)
