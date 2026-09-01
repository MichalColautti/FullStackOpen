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

/*const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}*/

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      {/* <Total course={course} /> */}
    </>
  )
}

export default Course