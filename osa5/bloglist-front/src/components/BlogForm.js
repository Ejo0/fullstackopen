import { Button, TextField } from '@mui/material'
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
          <TextField
            label="Title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            sx={{ paddingBottom: '10px' }}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            sx={{ paddingBottom: '10px' }}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          ></TextField>
        </div>
        <div>
          <Button type="submit" name="createblog">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
