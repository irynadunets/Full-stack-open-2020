require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const winston = require('./winston')
const Person = require('./models/person')
const errorHandler = require('./middleware/errorHandler')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', req => JSON.stringify(req.body))
morgan.token('query', req => JSON.stringify(req.query))
app.use(morgan( ':method :status :url :query body :body size :res[content-length] - :response-time ms',
  { stream: winston.stream } ) )

app.use((req, res, next) => {
  winston.info(JSON.stringify(req.query))
  next()
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons =>  {
    if (persons) {
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  let person = new Person({
    name: body.name,
    number: body.number
  })

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  Person.find({}).then(persons => {
    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({
        error: 'name must do not repeat'
      })
    }
  })

  person.save().then(savedPerson => {
    return savedPerson.toJSON()
  })
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      return updatedPerson.toJSON()
    })
    .then(updatedAndFormattedPerson => {
      response.json(updatedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
