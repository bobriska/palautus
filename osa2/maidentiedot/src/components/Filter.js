const Filter = ({filter, setFilter}) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    return (
        <form >
            <p>find countries: <input filter={filter} onChange={handleFilterChange}/></p>
        </form>
    )
}

export default Filter