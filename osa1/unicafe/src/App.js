import { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        clickHandler={() => setGood(good + 1)}
        text="good"
      />
      <Button
        clickHandler={() => setNeutral(neutral + 1)}
        text="neutral"
      />
      <Button
        clickHandler={() => setBad(bad + 1)}
        text="bad"
      />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

const Button = ({clickHandler, text}) => (
  <button onClick={clickHandler}>{text}</button>
)

const Statistics =({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return <div>No feedback given</div>
  }
  const average = (good - bad) / all
  const positive = good * 100 / all
  return (
    <div>
      good {good}<br></br>
      neutral {neutral}<br></br>
      bad {bad}<br></br>
      all {all}<br></br>
      average {average}<br></br>
      positive {positive} %<br></br>
    </div>
  )
}

export default App;
