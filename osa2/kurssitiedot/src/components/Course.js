import React from 'react'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

const Header = ({course}) => {
    return (
      <h2>{course.name}</h2>
    )
  }
 
const Content = ({course}) => {
    return (
      <div> 
          {course.parts.map(part => <Parts key={part.id} part={part}/>)}
      </div>
    )
}

const Parts = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
}
  
const Total = ({course}) => {
    return (
      <h3>Number of exercises {course.parts.map(part => part.exercises).reduce((a, b) => a + b)} </h3>
    )
}

export default Course