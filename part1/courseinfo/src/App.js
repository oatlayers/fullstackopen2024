const Header = (props) => {
  return (
    <h1>
        <p>{props.course}</p>
    </h1>
  )

}

const Part = (props) => {
  return (
    <div>
      <p>{props.part1} {props.exercises1}</p>
      <p> {props.part2} {props.exercises2} </p>
      <p> {props.part3} {props.exercises3} </p>
    </div>

  )
}


const Content = (props) => {
  return (
    <div>
      <Part/>
      <Part/>
      <Part/>
    </div>

  )

}


const Total = (props) => {
  return (
    <div>
        <p>Number of exercises {props.exercises} </p>
    </div>
  )

}

const App = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
      <div>
          <Header course = 'Half Stack application development'/>
          <Part part1 = {part1} exercises1 = {exercises1} part2 = {part2} exercises2 = {exercises2} part3 = {part3} exercises3 = {exercises3}/>
          <Content/>
          <Total exercises = {exercises1 + exercises2 + exercises3}/>
      </div>
  )
}

export default App