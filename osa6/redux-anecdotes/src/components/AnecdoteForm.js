import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    props.createAnecdote(content)
    props.showNotification(`Added '${content}'`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
