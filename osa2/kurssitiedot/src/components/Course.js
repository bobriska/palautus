const Course = ({course}) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({text}) => (<h1>{text}</h1>)

const Content = ({parts}) => {
  return (
      <>
        {parts.map(part => 
          <p key={part.id}> 
            {part.name} {part.exercises} 
          </p>)}
      </>
  )
}

const Total = ({parts}) => {  
  return (
    <b>total of {parts.map(value => value.exercises).reduce((a, b) => a + b, 0)} exercises</b>
  )
}

export default Course