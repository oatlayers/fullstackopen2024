import { useState } from 'react'
import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom"
import { Anecdote, AnecdoteList, About, Footer, CreateNew } from './components'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const notify = () => {
    if (notification) {
      return <div>{notification}</div>
    }
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
        {notify()}
      </div>
      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>} />
        <Route path="/create" element={
          notification
          ? <Navigate replace to="/anecdotes" />
          : <CreateNew addNew={addNew} setNotification={setNotification} />
        } />
        <Route path="/about" element={<About/>} />
      </Routes>    
      <Footer />
    </div>
  )
}



export default App