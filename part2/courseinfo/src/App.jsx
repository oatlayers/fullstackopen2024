const Header = ({ course }) => <h1>{course.name}</h1>

const Course = ({course}) => {
  return (
    <>
      <p>{course.parts[0].name}</p>
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
    </>
  )
}

export default App