import personsService from '../services/persons'

const PersonsForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setTimedOutMsg}) => {

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
  
    const addPerson = (event) => {
        event.preventDefault()
  
        const updateId = persons.filter(value => value.name === newName).map(value => value.id)[0]
        
        if (updateId) {
            if (window.confirm(`${newName} is already in phonebook, do you want to update the number to ${newNumber}?`)) {
                const personObject = {
                    name: newName,
                    number: newNumber,
                    id: updateId,
                }
                const personsCopy = persons
                personsCopy.filter(value => value.id === updateId)[0].number = newNumber
                // update existing
                personsService
                    .update(updateId, personObject)
                        .then(returnedPerson => {
                            setPersons(personsCopy)
                            setTimedOutMsg(['success', `${newName} updated`])
                            setNewName('')
                            setNewNumber('')
                        }).catch(error => {
                            setTimedOutMsg(['error', `error updating person: ${error}`])
                        })
            }  
        } else {//not an update, adding new person
            if( newName && newNumber ) { //shoud have some values in both name and number
                if (persons.filter(value => value.number === newNumber).length === 0) {
                    //new entries id is set larger than any previous, don't matter if missing eg 1,3,4
                    const max_id = Math.max(...persons.map(o => o.id))
                    const personObject = {
                        name: newName,
                        number: newNumber,
                        id: max_id + 1,
                    }
                    personsService
                        .create(personObject)
                        .then(returnedPerson => {
                            setPersons(persons.concat(returnedPerson))
                            setTimedOutMsg(['success', `${newName} added`])
                            setNewName('')
                            setNewNumber('')
                        })
                        .catch(error => {
                            setTimedOutMsg(['error', `error adding person: ${error}`])
                        })
                } else {
                    setTimedOutMsg(['error', `${newNumber} is already added to phonebook`])
                }
            } else {
                setTimedOutMsg(['notification', 'empty values can\'t be added to phonebook'])
            }
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

export default PersonsForm