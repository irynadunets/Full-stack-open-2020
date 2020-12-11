const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')
const winston = require('./utils/winston')
const mongoose = require('mongoose')

morgan.token('body', req => JSON.stringify(req.body))
morgan.token('query', req => JSON.stringify(req.query))
app.use(morgan( ':method :status :url :query body :body size :res[content-length] - :response-time ms',
  { stream: winston.stream } ) )

app.use((req, res, next) => {
  winston.info(JSON.stringify(req.query))
  next()
})

const mongoUrl = 'mongodb+srv://fullstack:admin@cluster0.0ur8t.mongodb.net/phonebook?retryWrites=true&w=majority'

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
