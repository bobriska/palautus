import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'

//set timer to this variable so it can be reset and each notification shown 5 sec
let trackTimeout = {}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState([])

  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const setTimedOutMsg = (message) => {
    setMessage( message )
      window.clearTimeout(trackTimeout)
      trackTimeout = window.setTimeout(() => setMessage([]),5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <FilterForm filter={filter} setNewFilter={setNewFilter}/>
      <h2>Add person</h2>
      <PersonsForm 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons} 
        setMessage={setMessage}
        setTimedOutMsg={setTimedOutMsg}
      />
      
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        setPersons={setPersons} 
        filter={filter}
        setMessage={setMessage}
        setTimedOutMsg={setTimedOutMsg}
      />
    </div>
  )

}

export default App