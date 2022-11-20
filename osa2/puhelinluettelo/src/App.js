import { useState } from 'react'

const FilterForm = ({filter, setNewFilter}) => {

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return(
    <form >
      <p>filter shown with: <input value={filter} onChange={handleFilterChange}/></p>
    </form>
  )
}

const Persons = ({persons, filter}) => {
  return(
    persons.filter(value => value.name.toLowerCase().includes(filter.toLowerCase())).map(entry => <p key={entry.name}>{entry.name} {entry.number}</p>)
  )
}
//(el) => el.toLowerCase().includes(query.toLowerCase())
const PersonsForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(value => value.name === newName).length === 0) {
      if (persons.filter(value => value.number === newNumber).length === 0) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: newName,
        }
  
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      } else {
        alert(`${newNumber} is already added to phonebook`)
      }
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }


  return(
  <form onSubmit={addPerson}>
    <div>
      <p>name: <input value={newName} onChange={handleNameChange}/></p>
      <p>number: <input value={newNumber} onChange={handleNumberChange}/></p>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filter={filter} setNewFilter={setNewFilter}/>

      <h2>Add person</h2>
      <PersonsForm 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}  
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
      
    </div>
  )

}

export default App