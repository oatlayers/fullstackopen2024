import { useStat, useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submmit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App