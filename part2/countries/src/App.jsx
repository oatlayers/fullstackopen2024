import { useEffect, useState } from "react"
import countriesService from "./services/countries"
import axios from 'axios'

const Countries = ({countries}) => {

  // for (const key in countries["languages"]) {
  //   const value = countries["languages"][key];
  //   console.log(`${value}`);
  // }

  return (
    <>
      <h1>{countries["name"]["common"]}</h1>
      <p>capital {countries["capital"]}</p>
      <p>area {countries["area"]}</p>

      <b>languages:</b>

      {console.log(countries["flag"])}
    </>

  )
}

const App = () => {
  const [countries, setCountries] = useState()
  const [filter, setFilter] = useState('')
  const [test, setTest] = useState([])

  // useEffect(() => {
  //   countriesService
  //   .getAll('india')
  //   .then(initialCountry => {
  //     setCountries(initialCountry)
  //   })
  // }, [])
  
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  // const obj = { France: "Paris", England: "London" };
  // // Iterate over the property names:
  // for (const country of Object.keys(obj)) {
  //   const capital = obj[country];
  //   console.log(country, capital);
  // }

  useEffect(() => {
    axios.get(baseUrl)
    .then(response => {
      setTest(response.data)
      console.log('value of response data:', response.data)
      console.log('value of test:', test)
      console.log('value of test name common:', test[1]["name"]["common"])
      

    })
  }, [filter])

  const testFind = (test) => {
    for (const key in Object.keys(test)) {

    }
  }

  console.log('value of test map:',
    test.map(object => object["name"])
  )

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
      
  // console.log('value of filter:', filter)

  // console.log('value of countries common name:', countries["name"]["common"])


  return (
    <>
      find countries <input onChange={handleFilter}></input>

    </>
  )
}

export default App