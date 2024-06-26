import { useDispatch, useSelector } from "react-redux"
import { toggleVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filtered = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filtered.toLowerCase())
  )

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  const handlevote = (anecdote) => {
    dispatch(toggleVote({ id: anecdote.id }))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div> {anecdote.content} </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {handlevote(anecdote)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList