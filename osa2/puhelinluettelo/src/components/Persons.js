import Button from './Button'

const Persons = ({persons, setPersons, filter, setMessage, setTimedOutMsg}) => {
    return(
        persons.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()))
            .map(entry => 
                <p key={entry.name}>
                    {entry.name} {entry.number} 
                <Button 
                    rem_id={entry.id} 
                    rem_name={entry.name} 
                    persons={persons} 
                    setPersons={setPersons} 
                    setTimedOutMsg={setTimedOutMsg}/>
                </p>
            )
    )
}

export default Persons
