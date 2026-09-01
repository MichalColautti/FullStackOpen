const Header = ({course}) => {
  return(
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
       <Part part={part.name} exercise={part.exercises} />
      )}
    </>
  )
}

const Part = ({part, exercise}) => {
  return (
    <>
      <p>{part} {exercise} </p>
    </>
  )
}

const Total = ({parts}) => {
  let total = parts.reduce(
    function(total, part) {
      return total + part.exercises;
    }, 0);

  return (
    <>
      <b>Number of exercises {total}</b>
    </>
  )
}

const Course = ({course}) => {
  const parts = course.parts

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} /> 
    </>
  )
}

export default Course