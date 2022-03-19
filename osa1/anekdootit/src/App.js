import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))

  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * 7)
    setSelected(random)
  }

  const vote = () => {
    const helper = [...points]
    helper[selected] += 1
    setPoints(helper)
  }

  const leader = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Content anecdote={anecdotes[selected]} votes={points[selected]}/>
      <button onClick={nextAnecdote}>next anecdote</button>
      <button onClick={vote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <Content anecdote={anecdotes[leader()]} votes={points[leader()]}/>
    </div>
  )
}

const Content = ({anecdote, votes}) => (
  <p>
    {anecdote}<br></br>
    <Votes votes={votes}/>
  </p>
)

const Votes = ({votes}) => {
  if (votes === 1) return <span>Has 1 vote</span>
  return <span>Has {votes} votes</span>
}

export default App;