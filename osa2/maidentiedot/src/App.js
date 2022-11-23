import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountry from './components/ShowCountry'

//API KEY expected in REACT_APP_API_KEY
//eg. ($env:REACT_APP_API_KEY = "XXX") -and (npm start)

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const filteredCountries = allCountries
    .filter(value => value.name.common.toLowerCase().includes(filter.toLowerCase()))
  // if there is one country show that one
  if (filteredCountries.length === 1) {
    return(
      <div>
        <Filter filter={filter} setFilter={setFilter}/>
        <ShowCountry countryToShow={filteredCountries[0]}/>
      </div>
    )
  }
  //otherwise if 10 or less show list with buttons
  //button selectes country by setting filter 
  if (filteredCountries.length < 11) {
    return (
      <div>
        <Filter filter={filter} setFilter={setFilter}/>
        {filteredCountries.map(value => 
          <p key={value.name.common}>{value.name.common} 
            <button onClick={() => setFilter(value.name.common)}>show</button>
          </p>)}
      </div>
    )
  }
  //default to too many matches
  return (
    <div> 
      <Filter filter={filter} setFilter={setFilter}/>
      Too many matches, specify another filter 
    </div>
  )
}

export default App;
