import React, { useState, useEffect } from 'react'
import axios from 'axios'

// const useField = (type) => {
//   const [value, setValue] = useState('')

//   const onChange = (event) => {
//     setValue(event.target.value)

//     setFilteredCountry(
//       allCountries.filter(
//         country => country.name.common.toLowerCase().search(event.target.value.toLowerCase()) !== -1
//       )
//     ) 
//   }

//   return {
//     type,
//     value,
//     onChange
//   }
// }

// const useCountry = (name) => {
//   const [country, setCountry] = useState(null)

//   useEffect(() => {})

//   return country
// }

// const Country = ({ country }) => {
//   if (!country) {
//     return null
//   }

//   if (!country.found) {
//     return (
//       <div>
//         not found...
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h3>{country.data.name} </h3>
//       <div>capital {country.data.capital} </div>
//       <div>population {country.data.population}</div> 
//       <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
//     </div>
//   )
// }

const Display = ({ country }) => {
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
    </>
  )
}

const App = () => {
  // const nameInput = useField('text')
  // const [name, setName] = useState('')
  // const country = useCountry(name)

  // const fetch = (e) => {
  //   e.preventDefault()
  //   setName(nameInput.value)
  // }

  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState([])
  const [filteredCountry, setFilteredCountry] = useState([])
  const [country, setCountry] = useState({})

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setAllCountries(response.data))
  }, [])

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
    if (filteredCountry.length === 1) {
      setCountry({...filteredCountry[0]})
    } else if (filteredCountry.length !== 1) {
      setCountry({})
    }
  
  }, [filteredCountry])

  const handleClick = (setCountry) => {
    () => setCountry({...filteredCountry[keys]})
    console.log('country country:', country)
  }

  const display = () => {
    if (filteredCountry.length <= 10) {
      return (
        Object.keys(filteredCountry).map(
          keys => <p key={filteredCountry[keys].ccn3}>
            {filteredCountry[keys].name.common} <button onClick={handleClick(setCountry)}>show</button>
            </p>)
      )
    }
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input onChange={handleFilter} />
        <button>find</button>
      </form>

      {display()}
      {country.name && <Display country={country}/>}
    </div>
  )
}

export default App