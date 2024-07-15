import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: "NOTIFY", payload: `you added ${data.content}`})
    },
    onError: () => {
      dispatch({ type: "NOTIFY", payload: 'too short anecdote, must have length 5 or more'})
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
