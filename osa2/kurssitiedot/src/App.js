const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part_name={props.parts[0].name} part_exercises={props.parts[0].exercises} />
      <Part part_name={props.parts[1].name} part_exercises={props.parts[1].exercises} />
      <Part part_name={props.parts[2].name} part_exercises={props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return(
  <p>
    {props.part_name} {props.part_exercises}
  </p>
  )
}

const Total = (props) => {   
  return (
    <p>Number of exercises {props.exercises.map(value => value.exercises).reduce((a, b) => a + b, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={parts} />
    </div>
  )
}

export default App