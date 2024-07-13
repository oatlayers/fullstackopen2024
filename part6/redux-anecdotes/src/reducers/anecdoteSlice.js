import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { toggleVote, createAnecdote, setAnecdotes, setNotification, clearNotification } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const makeAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.postAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const updatedAnecdotes = anecdotes.map(a => {
      if (a.id === anecdote.id) {
        return { ...a, votes: a.votes + 1 }
      } return a
    })

    await anecdoteService.voteAnecdote({...anecdote, votes: anecdote.votes + 1 })
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export default anecdoteSlice.reducer