const { gql } = require("apollo-server");

const typeDefs = gql`

type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}

type Author {
  name: String!
  born: Int
  id: ID!
  bookCount: Int!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allBooksByAuthor(author: String!): [Book!]!
    allBooksByGender(genre: String!): [Book!]!
    allAuthors: [Author!]!
}

type Subscription {
   bookAdded: Book!
}

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres:[String!]!
    ): Book
    editAuthor(
    name: String!
    born: Int!
  ): Author
    addAuthor(
    name: String!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  }
`
module.exports = {
  typeDefs
};
