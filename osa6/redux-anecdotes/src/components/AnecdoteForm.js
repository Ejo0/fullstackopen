import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotification(`Added ${content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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
