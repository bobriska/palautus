import { useState, useEffect } from 'react'
import axios from 'axios'

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

export default Weather