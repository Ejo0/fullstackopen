import {
  Button,
  Link,
  List,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { remove, like } from '../reducers/blogReducer'
import { commentBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const addLike = () => dispatch(like(blog))
  const removeBlog = () => dispatch(remove(blog))

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  return (
    <div>
      <Typography variant="h2">{blog.title}</Typography>
      <Typography>
        Url:{' '}
        <Link href={blog.url} underline="none">
          {blog.url}
        </Link>
        <br />
        Likes: {blog.likes}
        <br />
        Added by <em>{blog.user.name}</em>
      </Typography>
      <br />
      <Button variant="outlined" sx={{ mr: 2 }} onClick={addLike}>
        Like
      </Button>
      {user.username === blog.user.username ? (
        <Button variant="outlined" color="error" onClick={removeBlog}>
          Remove
        </Button>
      ) : null}
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Comments:
      </Typography>
      <form onSubmit={handleComment}>
        <TextField
          label="comment"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></TextField>
        <div>
          <Button type="submit">Add comment</Button>
        </div>
      </form>
      <List>
        {blog.comments.map((c, i) => (
          <ListItemText key={i}>{c}</ListItemText>
        ))}
      </List>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
