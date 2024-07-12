import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteSlice'
import { useEffect } from 'react'
import store from './store'

const App = () => {  
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      store.dispatch(setAnecdotes(anecdotes))
    )
  }, [])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App