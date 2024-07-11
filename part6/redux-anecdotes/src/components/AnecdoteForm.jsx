import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteSlice"
import { setNotification, clearNotification } from "../reducers/notificationSlice"

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''
    const anecdote = {
      content,
      id: getId(),
      votes: 0
    }
    dispatch(newAnecdote(anecdote))
    dispatch(setNotification(`you created '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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
