const Header = (props) => {
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.course.parts.map(part =>
       <Part part={part.name} exercise={part.exercises} />
      )}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercise} </p>
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.course.parts.forEach(part => total += part.exercises)

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} /> 
    </>
  )
}

export default Course