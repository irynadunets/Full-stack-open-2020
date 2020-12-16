import React, { useState, useEffect } from 'react'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

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
      published
      author {
        name
        bookCount
        born
      }
      id
      genres
    }
}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
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
  const [token, setToken] = useState(null)
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
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  useEffect(() => {

    if (resultAuthors.data) {
      setAuthors(resultAuthors.data.allAuthors)
    }
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks)
    }
  }, [resultAuthors, resultBooks])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      const newData = [...dataInStore.allBooks, addedBook]
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: newData
        }
      })
    }
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData }) => {
      console.log(subscriptionData);
      const bookAdded = subscriptionData.data.bookAdded
      notify(`${bookAdded.title} was added!`)
      updateCacheWith(bookAdded)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
    <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout} >logout</button>
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
