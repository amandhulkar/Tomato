const express = require('express')
const cors = require('cors')
const path = require('path')
const notFoundMiddleware = require('./middleware/notFoundMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  process.env.ADMIN_URL || 'http://localhost:5174'
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API running',
    endpoints: {
      health: '/api/health',
      food: '/api/food',
      auth: '/api/auth'
    }
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API running'
  })
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/food', require('./routes/foodRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))

app.use(notFoundMiddleware)
app.use(errorMiddleware)

module.exports = app
