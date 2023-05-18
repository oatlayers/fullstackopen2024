const Course = ({ course }) => {
    return (
      <div>
        <h2>{course.name}</h2>
        {course.parts.map(part =>
          <p key={part.id}>{part.name} {part.exercises}</p>
        )}
        <b>total of {course.parts.reduce((s, p) => {
          return s + p.exercises
          }, 0)} exercises
        </b>
      </div>
    )
}

export default Course