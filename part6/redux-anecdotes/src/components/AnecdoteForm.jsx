import { useDispatch } from "react-redux"
import { makeAnecdote } from "../reducers/anecdoteSlice"
import { changeNotification } from "../reducers/notificationSlice"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''

    dispatch(makeAnecdote(content))
    dispatch(changeNotification(`you created '${content}'`, 5))
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
