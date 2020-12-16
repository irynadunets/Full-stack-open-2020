import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
  }
`;

const ALL_BOOKS = gql`
query {
  allBooks {
      ...bookDetails
    }
}
${BOOK_DETAILS}
`
const ALL_AUTHORS = gql`
query {
 allAuthors {
   name
   bookCount
   born
 }
}
`
const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!) {
  addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
      ){
        ...bookDetails
      }
      ${BOOK_DETAILS}
}
`
const CREATE_AUTHOR = gql`
mutation createAuhtor($name: String!) {
  addAuthor(
        name: $name
      ){
        name
      }
}
`

const NewBook = ({ setError, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const [ createAuhtor ] = useMutation(CREATE_AUTHOR, {
      onError: (error) => {
      console.log(error)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: [ ...dataInStore.allAuthors, response.data.addAuthor ]
        }
      })
    }
    }
  )

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({  variables: { title, author, published, genres } })
    let name = author
    createAuhtor({  variables: { name } })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
