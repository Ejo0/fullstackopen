import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const addVote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(vote(id))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
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
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
