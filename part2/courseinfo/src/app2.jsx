const Header = ({ course }) => <h2>{course.name}</h2>

// using map to iterate therefore the number of items can be arbitrary; also added keys for each element generated
const Course = ({course}) => {
  return (
    <>
      {course.parts.map(parts => <p key={parts.id}>{parts.name} {parts.exercises}</p>)}
    </>  
  )
}

// using reduce to find sum
const Sum = ({course}) => {
  const sumWithInitial = course.parts.reduce(
    (total, amount) => total + amount.exercises, 0
  );
  return (
    <>
      <p><b>total of {sumWithInitial} exercises</b></p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Course course={course} />
      <Sum course={course} />
    </>
  )
}

export default App