import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postAnecdote = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const { id, votes } = anecdote
  const response = await axios.put(`${baseUrl}/${id}`, { ...anecdote })
  return response.data
}

export default { getAll, postAnecdote, voteAnecdote }