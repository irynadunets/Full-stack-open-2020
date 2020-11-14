import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const PersonsList = ({ persons, setPersons, searchName, setErrorMessage }) => {

  const deletePerson = ( name, id ) => {
    if (name && window.confirm(`Delete ${name}`)) {
      personService
      .delate(id)
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        setErrorMessage('Information of' + name + 'has already been removed from server')
    })
  }
}

  return (
    <ul>
    {
    persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
      .map(person => (
          <li key={person.id}>
           <Person  name={person.name} number={person.number}/>
           <button onClick={() => deletePerson(person.name, person.id)}>Delete</button>
         </li>
    )
    )}
    </ul>
  )
}

export default PersonsList
