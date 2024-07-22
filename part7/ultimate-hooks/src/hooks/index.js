import { useState, useEffect } from 'react'
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
  
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
    // initial fetching from db.json
    useEffect(() => {
      axios
      .get(baseUrl)
      .then(res => {
        setResources(res.data)
      })},[])
  
    // need to use prev to prevent direct mutation
    const create = (resource) => {
      axios.post(baseUrl, resource)
      .then(res => {
        setResources(prev => [...prev, res.data])
      })
    }
  
    const service = {
      create
    }

    return [resources, service]
  }