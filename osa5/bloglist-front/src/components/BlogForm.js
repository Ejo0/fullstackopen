import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    if (await dispatch(create(newBlog))) {
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          <span>Title: </span>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          <span>Author: </span>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          <span>Url: </span>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit" name="createblog">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
