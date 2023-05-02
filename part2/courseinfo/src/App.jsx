// using map to get all course header names; for arbitrary number of courses. keys included
const Header = ({courses}) => {
  return (
    <>
      {courses.map(courses => <h2 key={courses.id}>{courses.name}</h2>)}
    </>
  )
}

// generate parts for arbitrary number of courses. keys included.
/* 
perhaps u can find how much object the array contains, use that as the index and then u can apply map for the parts.

*/
// const Course = ({courses}) => {
//   const findParts = courses[]
//   return (
//     <>

//     </>  
//   )
// }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      <Header courses={courses}/>
    </>
  )
}

export default App