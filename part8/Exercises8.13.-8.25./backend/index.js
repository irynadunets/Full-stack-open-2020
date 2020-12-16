const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const { typeDefs } = require("./typeDefs")
const { resolvers } = require("./resolvers");
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require("jsonwebtoken");
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
const { v1: uuid } = require('uuid')

const MONGODB_URI = 'mongodb+srv://fullstack:admin@cluster0.0ur8t.mongodb.net/gql-library?retryWrites=true&w=majority'

const JWT_SECRET = "secred"

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
