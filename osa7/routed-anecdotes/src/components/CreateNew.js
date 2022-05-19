import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

export const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate("/")
  }

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const withoutReset = (obj) => {
    const { reset, ...rest } = obj
    return rest
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...withoutReset(content)} />
        </div>
        <div>
          author
          <input {...withoutReset(author)} />
        </div>
        <div>
          url for more info
          <input {...withoutReset(info)} />
        </div>
        <button>create</button>
      </form>
      <button onClick={reset}>reset</button>
    </div>
  )
}
