const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/api/users', async (request, response) => {
  User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    .then(users => {
      response.json(users)
    })
})

usersRouter.post('/api/users', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
