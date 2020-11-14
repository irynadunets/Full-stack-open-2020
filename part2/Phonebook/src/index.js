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
        setPersons(initialPersons.data)
      })
      .catch(error => {
        console.log('fail')
  })
  }, [])

  const addPerson = () => {

    const personObject = {
      name: newName,
      number: newNumber,
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
           .save()
           .then(returnedPerson => {
             setPersons(returnedPerson.data)
             setMessage('Person is updated in phonebook')                
             setTimeout(() => {
               setMessage(null)
             }, 50000)
             setNewName('')
             setnewNumber('')
           })
           .catch(error => {
             setErrorMessage(`Information of '${person.name}' has already been removed from server`)
             setTimeout(() => {
               setErrorMessage(null)
             }, 5000)
       })
  }

  personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(returnedPerson.data)
      setMessage('Person is added in phonebook')
      setTimeout(() => {
        setMessage(null)
      }, 50000)
      setNewName('')
      setnewNumber('')
    })
    .catch(error => {
      setErrorMessage(`Information of '${personObject.name}' has already been removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  })

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
