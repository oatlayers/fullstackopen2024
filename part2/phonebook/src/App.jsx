import { useState } from "react"
// import Filter from './components/Filter'
// import Form from './components/Form'
// import Persons from './components/Persons'

const Name = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Marcus Aurelius",
      number: "1634-3345-1311",
      id: 1
    },
    { name: "Lucius Annaeus Seneca",
    number: "5978-8564-6473",
    id: 2
    },
    { name: "Antoninus Pius",
    number: "4678-7463-3324",
    id: 3
    },
    { name: "Trajan",
    number: "1114-6738-8253",
    id: 4
    },
  ])
  
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons);
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((p) => p["name"] === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNum('')
      return false
    }

    const nameObject = {
      name: newName,
      number: newNum
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <Filter persons={persons}/> */}
      filter shown with <input onChange={handleFilterChange}/>
      <h3>add a new</h3>
      {/* <Form /> */}
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
      <h3>Numbers</h3>
      {/* <Persons /> */}
      {filterPersons.map(person => 
        <Name key={person.name} person={person} />
      )}
    </div>
  )
}

export default App