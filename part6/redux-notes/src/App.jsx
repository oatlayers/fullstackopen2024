import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import Notes from './components/Notes'
import NewNote from './components/NewNote'

const App = () => {
  return(
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App