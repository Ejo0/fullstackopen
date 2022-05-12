import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(addVote(id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
