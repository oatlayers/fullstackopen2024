import { useState } from "react"

const Name = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Alan Turing"},
    {name: "Bernard Lewis"}
  ])
  const [newName, setNewName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((p) => p["name"] === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return false
    }

    const nameObject = {
      name: newName
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Name key={person.name} person={person} />
      )}
    </div>
  )
}

export default App