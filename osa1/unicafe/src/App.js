import { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
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
      <h1>statistics</h1>
      <p>
        good {good}<br></br>
        neutral {neutral}<br></br>
        bad {bad}
      </p>
    </div>
  )
  
}

const Button = ({clickHandler, text}) => (
  <button onClick={clickHandler}>{text}</button>
)

export default App;
