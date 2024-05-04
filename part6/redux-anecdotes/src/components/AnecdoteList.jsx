import { useDispatch, useSelector } from "react-redux"
import { toggleVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    
    anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div> {anecdote.content} </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(toggleVote(anecdote.id))}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList