import Weather from "./Weather"

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

export default ShowCountry