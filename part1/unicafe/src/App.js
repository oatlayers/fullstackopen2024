import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleCLick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>{props.text} {props.value} {props.percent}</div>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad > 0) {
    return (      
        <table>
          <tr>
            <td><StatisticLine text = 'good' /></td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td><StatisticLine text = 'neutral' /></td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td><StatisticLine text = 'bad' /></td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td><StatisticLine text = 'all' /></td>
            <td>{props.good + props.neutral + props.bad}</td>
          </tr>
          <tr>
            <td><StatisticLine text = 'average' /></td>
            <td>{(props.good*1 + props.bad*-1) / (props.good + props.neutral + props.bad)}</td>
          </tr>
          <tr>
            <td><StatisticLine text = 'positive'  /></td>
            <td>{(props.good / (props.good + props.neutral + props.bad))*100} %</td>
          </tr>
        </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleCLick = {() => setGood(good + 1)} text = 'good'/>
      <Button handleCLick = {() => setNeutral(neutral + 1)} text = 'neutral'/>
      <Button handleCLick = {() => setBad(bad + 1)} text = 'bad'/>

      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>

  )
}

export default App