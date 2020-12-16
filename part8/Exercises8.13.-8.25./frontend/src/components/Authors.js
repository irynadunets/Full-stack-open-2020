
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
 allAuthors {
   name
   born
   bookCount
 }
}
`
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
        name: $name
        born: $born
      ){
        name
        born
      }
}
`
const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)      
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: [ ...dataInStore.allAuthors, response.data.editAuthor ]
        }
      })
    }
  }
  )
  if (!props.show) {
    return null
  }
  let authors=[]
  if(props.authors) {
    authors=props.authors
    console.log(authors)
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({  variables: { name, born: born.length > 0 ? born : null } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
