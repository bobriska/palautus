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

export default FilterForm

