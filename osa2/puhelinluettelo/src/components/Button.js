import personsService from '../services/persons'

const Button = ({rem_id, rem_name, persons, setPersons, setTimedOutMsg}) => {
    const removePersons = () => {
        if (window.confirm(`Do you really want to delete ${rem_name}?`)) {
            personsService.remove(rem_id)
                .then(() => {
                    setPersons(persons.filter(n => n.id !== rem_id))
                    setTimedOutMsg(['success', `${rem_name} removed`])
                })
                .catch(error => {setTimedOutMsg(['error', `error removing ${rem_name}: ${error}`])
                    setPersons(persons.filter(n => n.id !== rem_id))
                })
        }
    }
  
    return(
        <button onClick={() => removePersons()}>delete</button>
    )
}

export default Button