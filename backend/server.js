require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const appointmentRoutes = require('./routes/appointment.routes')

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is running' })
})

app.use('/api/appointments', appointmentRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message)
    process.exit(1)
  })
