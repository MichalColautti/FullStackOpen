import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const average = (n,all) => {
  return n/all
}

const percent = (n,all) => {
  return (n * 100) / all
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad

  if (all == 0) {
    return (
      <p>no feedback given</p>
    )
  } 

  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average(good-bad,all)} />
      <StatisticLine text='positive' value={percent(good,all)} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App