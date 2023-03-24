const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = () => {
    return (
      <h1>
          <p>{course.name}</p>
      </h1>
    )

  }
  const Part1 = () => {
    return (
      <div>
          <p>{course.parts[0].name} {course.parts[0].exercises}</p>
      </div>
    )

  }
  const Part2 = () => {
    return (
      <div>
          <p>{course.parts[1].name} {course.parts[1].exercises}</p>
      </div>
    )

  }
  const Part3 = () => {
    return (
      <div>
          <p>{course.parts[2].name} {course.parts[2].exercises}</p>
      </div>
    )

  }
  const Content = () => {
    return (
      <div>
          <Part1 />
          <Part2 />
          <Part3 />
      </div>
    )

  }
  const Total = () => {
    return (
      <div>
          <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
      </div>
    )

  }
  return (
      <div>
          <Header />
          <Content />
          <Total />
      </div>
  )
}

export default App
