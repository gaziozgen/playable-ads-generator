const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const authRouter = require('./controllers/auth')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use("/", express.static('dist'))

app.use(express.json())

app.use('/api/auth', authRouter)

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})