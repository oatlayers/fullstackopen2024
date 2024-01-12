import { useEffect, useState } from "react"
import axios from 'axios'

const Display = ({country}) => {

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <b>languages:</b>
      <ul>
        {Object.keys(country.languages).map(keys => <li key={keys}>{country.languages[keys]}</li>)}
      </ul>

      <img src={`${country.flags.png}`} alt={`flag of ${country.name.common}`}/>
    </>
  )
}


const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState([])
  const [filteredCountry, setFilteredCountry] = useState([])
  const [country, setCountry] = useState({})

  // get initial data and store in countries state
  useEffect(() => {
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(
        response => setAllCountries(response.data)
      )
    }, [])

  // set value of filteredcountry to value of filter. !==-1 means it only set the value of filteredcountry to when it returns true (when common name contains the string of filter)
  const handleFilter = (event) => {
    setFilter(event.target.value)

    setFilteredCountry(
      allCountries.filter(
        country => country.name.common.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      )
    ) 
  }

// whenever value of filteredCountry changes, effect is triggered and if value is 1 then set country state value to the first array element bc there's only one otherwise return empty object
  useEffect(() => {
    console.log('length:', filteredCountry.length)
    console.log('value of filteredCountry:', filteredCountry)

    if (filteredCountry.length === 1) {
      setCountry({...filteredCountry[0]})
    } else if (filteredCountry.length !== 1) {
      setCountry({})
    }
  
  }, [filteredCountry])

  // display list of matches when less or equal than ten
  const displayCountry = () => {
    if (filteredCountry.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    } else if (filteredCountry.length === 1) {
      return (false)
    } else if (filteredCountry.length <= 10) {
      return (Object.keys(filteredCountry).map(
        keys => <p key={filteredCountry[keys].ccn3}>{filteredCountry[keys].name.common}</p>))
    }
  }

  console.log('value of country:', country)

  // value={filter} bc controlled component. only display last expression when country has value (when filtered country only has one element)
  return (
    <>
      find countries <input value={filter} onChange={handleFilter}></input>

      {displayCountry()}
      

      {country.name && <Display country={country}/>}
    </>
  )
}

export default App