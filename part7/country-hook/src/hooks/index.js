import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {
    axios
    .get(`${baseUrl}/${name}`)
    .then(res => {
      // console.log('response.data ', res.data)
      setCountry(res.data)
    })
    .catch(error => {
      setCountry(null)
    })
  },[name])

  // console.log('country', country)

  return country
}