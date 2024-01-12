import { useEffect, useState } from "react"
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Display = ({ country }) => {
    const [weather, setWeather] = useState({})
  
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then(response => setWeather(response.data))
        .catch(err => console.log(err))
    }, [country.capital])
  
    // console.log('value of weather:', weather)
  
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
  
        <b>languages:</b>
        <ul>
          {Object.keys(country.languages).map(keys => (
            <li key={keys}>{country.languages[keys]}</li>
          ))}
        </ul>
  
        <img src={`${country.flags.png}`} alt={`flag of ${country.name.common}`} />
  
        <h1>Weather in {country.capital}</h1>
        {Object.keys(weather).length !== 0 ? (
          <>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>wind {weather.wind.speed} m/s </p>
          </>
        ) : <p>loading weather please wait</p>}
      </>
    )
}

export default Display