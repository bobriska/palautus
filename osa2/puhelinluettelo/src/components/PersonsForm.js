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

        if( newName && newNumber ) { 
        

            const updateId = persons.filter(value => value.name === newName).map(value => value.id)[0]

            if (updateId) {
                if (window.confirm(`${newName} is already in phonebook, do you want to update the number to ${newNumber}?`)) {
                    const personObject = {
                        name: newName,
                        number: newNumber,
                        id: updateId,
                    }
                    
                    const personsCopy = persons.filter(value => value.id !== updateId)

                    personsService
                        .update(updateId, personObject)
                        .then(returnedPerson => {
                            setPersons(personsCopy.concat(personObject))
                            setTimedOutMsg(['success', `${newName} updated`])
                            setNewName('')
                            setNewNumber('')
                        }).catch(error => {
                            setTimedOutMsg(['error', `error updating person: ${error.response.data.error}`])
                        })
                }  
            } else {//not an update, adding new person
            
                if (persons.filter(value => value.number === newNumber).length === 0) {
                    const personObject = {
                        name: newName,
                        number: newNumber,
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
                            setTimedOutMsg(['error', `Error adding person: ${error.response.data.error}`])
                        })
                } else {
                    setTimedOutMsg(['error', `${newNumber} is already added to phonebook`])
                }    
            }
        } else {
            setTimedOutMsg(['notification', 'empty values can\'t be added to phonebook'])
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