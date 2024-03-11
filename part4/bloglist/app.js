const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
app.use(cors())
app.use(express.json())

const blogsRouter = require('./controllers/blogs')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(middleware.requestLogger)

app.use('/', blogsRouter)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app