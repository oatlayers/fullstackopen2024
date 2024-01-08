import { useEffect, useState } from "react"
import axios from 'axios'
//Maintain the application's state and all event handlers in the App root component.

const FilterInput = ({filterText, handleFilter}) => {
  return (
    <>
      filter shown with <input value={filterText} onChange={handleFilter}/>
    </>
  )

}

const PersonForm = ({addPerson, newName, handleChange, handleNumChange, newNum}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleChange}/>
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonsFilter = ({filterText, filterPersons, persons}) => {
  const ifFiltered =
      <>
        {filterPersons.map((person) => 
        <p key={person.name}>{person.name} {person.number}</p>)}
      </>

  const notFiltered =
      <>
        {persons.map((person) => 
        <p key={person.name}>{person.name} {person.number}</p>)}
      </>

  return (
    filterText.length > 0 ?
      ifFiltered :
      notFiltered
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterText, setFilterText] = useState('')
  const [filterPersons, setFilterPersons] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p["name"] === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNum('')
      return false
    }

    const nameObject = {
      name: newName,
      number: newNum
    }

    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
    
    setNewName('')
    setNewNum('')
    })
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterText(event.target.value)
    setFilterPersons(persons.filter( (person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <FilterInput filterText={filterText} handleFilter={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleChange={handleChange} handleNumChange={handleNumChange} newNum={newNum}/>

      <h3>Numbers</h3>

      <PersonsFilter filterText={filterText} persons={persons}filterPersons={filterPersons}/>

    </div>
  )
}

export default App