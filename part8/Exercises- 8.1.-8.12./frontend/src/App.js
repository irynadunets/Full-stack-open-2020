import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
query {
 allAuthors {
   name
   born
   bookCount
 }
}
`

const ALL_BOOKS = gql`
query {
 allBooks {
   title
   author
   published
 }
}
`
const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [authors, setAuthors] = useState(null)
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [books, setBooks] = useState(null)
  useEffect(() => {
    if (resultAuthors.data) {
      setAuthors(resultAuthors.data.allAuthors)
    }
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks)
    }
  }, [resultAuthors, resultBooks])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
    <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors={authors}
      />

      <Books
        show={page === 'books'} books={books}
      />

      <NewBook
        show={page === 'add'}
      />
      <NewBook setError={notify} />

    </div>
  )
}

export default App
