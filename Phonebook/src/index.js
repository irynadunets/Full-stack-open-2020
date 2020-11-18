import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsList from './components/PersonsList'
import Notificatin from './components/Notificatin'
import Errorm from './components/Errorm'
import personService from './services/persons'
import './index.css'

const App = () => {

  let [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setnewNumber ] = useState('')
  const [ searchName, setsearchName ] = useState('')
  const [ notificationMessage, setMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail')
  })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

  let person = persons.find(obj => obj.name === personObject.name)
  if(person && window.confirm(`${person.name}
       is already added to phonebook, replace the old number with the new one?`)){
         const changedObject = { ...person, number: newNumber }
         console.log(changedObject)
         let id = person.id
         console.log(id)
         personService
           .update(id, changedObject)
           .then(returnedPerson => {
             setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
             setMessage(`Person '${returnedPerson.name}' is updated in phonebook`)
             setTimeout(() => {
               setMessage(null)
             }, 5000)
             setNewName('')
             setnewNumber('')
           })
           .catch(error => {
             console.log(error.response.data)
             setErrorMessage(error.response.data.error)
             setTimeout(() => {
               setErrorMessage(null)
             }, 5000)
       })
  } else {
  personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMessage(`Person '${returnedPerson.name}' is added in phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setnewNumber('')
    })
    .catch(error => {
      console.log(error.response.data)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  })
 }
 }

 const handlePersonNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePersonNumberChange = (event) => {
    setnewNumber(event.target.value)
  }

  const handlePersonNameSearch = (event) => {
    setsearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificatin message = {notificationMessage} />
      <Errorm message = {errorMessage} />
      <Filter searchName = {searchName} handlePersonNameSearch = {handlePersonNameSearch} />
      <h2>add a new</h2>
      <Form addPerson = {addPerson} newName = {newName} handlePersonNameChange = {handlePersonNameChange} newNumber = {newNumber} handlePersonNumberChange = {handlePersonNumberChange}/>
      <h2>Numbers</h2>
      <PersonsList persons= {persons} setPersons= {setPersons} searchName = {searchName} setErrorMessage={setErrorMessage} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
