import { useState, useEffect } from 'react'
import axios from 'axios'

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

const ShowCountry = ({countryToShow}) => {
  return(
    <div>
      <h2>{countryToShow.name.common} </h2>
      <p>capital {countryToShow.capital}</p> 
      <p>area {countryToShow.area}</p>
      <h3>languages: </h3>
      <ul>{Object.values(countryToShow.languages).map(entry => <li key={entry}>{entry}</li>)}</ul>
      <img src={countryToShow.flags.png} alt='countries flag'></img>
      <Weather capital={countryToShow.capital}/>
    </div>
  )
}

const Weather = ({capital}) => {
  const api_key=process.env.REACT_APP_API_KEY
  //($env:REACT_APP_API_KEY = "XXX") -and (npm start)
  const [weather_response, setWeatherResponse] = useState([])
  
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${api_key}`)
      .then(response => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}&units=metric`)
          .then(weatherHere => {
            const weatherReport = []
            weatherReport.push(`temperature ${weatherHere.data.main.temp} Celsius`)
            weatherReport.push(weatherHere.data.weather.map(value => 
              <p key={value.id}>
              <img src={"http://openweathermap.org/img/wn/"+value.icon+"@2x.png"} 
                alt={value.description}/>
              </p>))
              weatherReport.push(`wind ${weatherHere.data.wind.speed} m/s`)
              setWeatherResponse(weatherReport)
            }).catch(weathererror => {
              setWeatherResponse('Can\'t get weather: ' + weathererror.message)
            })
      })
      .catch(locationerror => {
        setWeatherResponse('Can\'t get weather location: ' + locationerror.message)
      })
    }
  )

    return (
      <div>
        <h2>Weather in {capital}</h2>
        {weather_response}
      </div>
    )
}

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
