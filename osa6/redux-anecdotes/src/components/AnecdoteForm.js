import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    dispatch(createAnecdote(content))
    dispatch(showNotification(`Added '${content}'`, 5))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={add}>
        <input name='content' /><br></br>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
