import { useState } from "react"

//Maintain the application's state and all event handlers in the App root component.

const Numbers = ({persons}) =>{

  return(
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Marcus Aurelius",
      number: "1634-3345-1311"
    },
    { name: "Lucius Annaeus Seneca",
    number: "5978-8564-6473"
    },
    { name: "Antoninus Pius",
    number: "4678-7463-3324"
    },
    { name: "Trajan",
    number: "1114-6738-8253"
    }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ filterPersons, setFilterPersons] = useState([])
  
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

  const handleFilter = (event) => {
    setFilterText(event.target.value)
    setFilterPersons(persons.filter( (person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filterText} onChange={handleFilter}/>
      <h2>add a new</h2>
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

      {filterText.length>0?
      <Numbers persons={filterPersons}></Numbers>:
      <Numbers  persons={persons}></Numbers>}
      
    </div>
  )
}

export default App