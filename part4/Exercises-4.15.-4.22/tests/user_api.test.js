const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    _id: '5fba82848476bd4711e77708',
    username: 'root',
    name: 'root',
    password: '123',
    blogs: ['5a422aa71b54a676234d17f7','5a422aa71b54a676234d17f9']
  },
  {
    _id: '5fba82848476bd4711e77709',
    username: 'root1',
    name: 'root1',
    password: '323',
    blogs: ['5a422aa71b54a676234d17f8', '5a422aa71b54a676234d17f6']
  },
  {
    _id: '5fba82848476bd4711e77710',
    username: 'root2',
    name: 'root3',
    password: '423',
    blogs: []
  },
  {
    _id: '5fba82848476bd4711e77711',
    username: 'root4',
    name: 'root4',
    password: '423',
    blogs: []
  }
]

  beforeEach(async () => {
      await User.deleteMany({})
      let userObject = new User(initialUsers[0])
      await userObject.save()
       userObject= new User(initialUsers[1])
      await userObject.save()
       userObject = new User(initialUsers[2])
      await userObject.save()
       userObject = new User(initialUsers[3])
      await userObject.save()
    })

    test('there are users', async () => {
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(4)
    })

    test('creation succeeds with a fresh username', async () => {

      const newUser = {
        username: 'salainen',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

     const response = await api.get('/api/users')

      expect(response.body).toHaveLength(5)

      const usernames = response.body.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)


      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })


afterAll(() => {
  mongoose.connection.close()
})
