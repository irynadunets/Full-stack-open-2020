const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const time = require('../utils/time')
const sinon = require('sinon')
sinon.stub(time, 'setTimeout')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'To Statement Considered Harmful',
    author: 'Adsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5fba82848476bd4711e77708',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Alfred W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5fba82848476bd4711e77709',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    user: '5fba82848476bd4711e77708',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    user: '5fba82848476bd4711e77709',
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})

test('there are blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(4)
})

test('test that verifies that the unique identifier property of the blog posts is named id', async () => {
  const blogToView = initialBlogs[1]
  console.log(blogToView)
  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id}`)
    .set('Authorization', 'root')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    "title":"Hello", "author":"Lolik", "url":"http/..", "likes":8
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'root')   
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(5)
})

test('a  blog can be updated ', async () => {
  const blogToView = initialBlogs[2]
  const newBlog = {
    "title":"Hi", "author":"Bolik", "url":"http/..", "likes":5, "user":"5fba82848476bd4711e77708"
  }

  await api
    .put(`/api/blogs/${blogToView._id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
    console.log(response.body[2])
    expect(response.body[2]).toEqual({"author": "Bolik",
      "id": "5a422aa71b54a676234d17f9", "likes": 5, "title": "Hi", "url": "http/..",
       "user":{"id": "5fba82848476bd4711e77708", "name": "root", "username": "root" },
})
})

test('if the likes property is missing from the request, it will default to the value 0 ', async () => {
  const newBlog = {
    "title":"Hello","author":"Lolik","url":"http/.."
  }

await api
    .post('/api/blogs')
    .set('Authorization', 'root')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)
  expect(likes).toContain(0)
})

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlog = {
    "author":"Lolik","likes":8
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(4)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogToDelete = initialBlogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length - 1)
    const ids = response.body.map(r => r._id)
    expect(ids).not.toContain(blogToDelete._id)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
