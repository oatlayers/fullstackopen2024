import { useState } from 'react'
const Statistics = (props) => {
  if (props.value === 0 || isNaN(props.value) === true) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
        {props.text} {props.value}
    </div>
  )
}
 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>give feedback</h1><br/>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>

      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='all' value={good + neutral + bad}/>
      <Statistics text='average' value={(good + neutral*0 + bad*-1)/(good + neutral + bad)}/>
      <Statistics text='positive' value={(good/ (good + neutral + bad))*100}/>
    </div>
  )
}

export default App