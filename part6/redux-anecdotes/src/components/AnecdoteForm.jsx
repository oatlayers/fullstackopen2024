import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationSlice"
import anecdoteService from '../services/anecdotes'
import { createAnecdote } from "../reducers/anecdoteSlice"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''

    const newAnecdote = await anecdoteService.postAnecdote(content)

    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`you created '${newAnecdote.content}'`))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="create" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
