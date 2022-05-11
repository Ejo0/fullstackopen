import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(addAnecdote(content))
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
