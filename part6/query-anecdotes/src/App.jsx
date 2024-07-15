import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => {
        if (a.id === anecdote.id) {
          return { ...a, votes: a.votes + 1 }
        } return a
      })
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "NOTIFY", payload: `you voted '${anecdote.content}`})
  }

  if (result.isLoading) {
    return <div>loading result...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems with server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App