import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const getRandomInt = () => setSelected(Math.floor(Math.random() * 8))
   
  const [counters, setCounters] = useState(new Array(8).fill(0))
  const handleVote = () => {
    const newCounters = [...counters]
    newCounters[selected] += 1
    setCounters(newCounters)  
  }

  const findLargest = Math.max(...counters)
  const largestVote = counters.indexOf(findLargest)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {counters[selected]} votes</div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={getRandomInt}>next anecdote</button>
      </div>

      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[largestVote]}</div>
      <div>has {findLargest} votes</div>
    </div>
  )
}
export default App