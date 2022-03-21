const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }
  
  
  const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <Total parts={parts} />
      </div>
    )
  }
  
  const Part = ({part}) => (
    <p>
      {part.name} {part.exercises}
    </p>
  )
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <b>total of {total} exercises</b>
  }

export default Course
