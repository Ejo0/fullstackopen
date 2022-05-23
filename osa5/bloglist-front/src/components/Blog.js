import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { remove, like } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [fullView, setFullView] = useState(false)
  const toggleFullView = () => setFullView(!fullView)

  const dispatch = useDispatch()
  const addLike = () => dispatch(like(blog))
  const removeBlog = () => dispatch(remove(blog))

  return (
    <div className="blog">
      {blog.title}; {blog.author}
      <button onClick={toggleFullView}>{fullView ? 'Hide' : 'View'}</button>
      <br />
      {fullView ? (
        <div>
          {blog.url}
          <br />
          Likes: {blog.likes}
          <button onClick={addLike}>Like</button>
          <br />
          {blog.user.name}
          <br />
          {user.username === blog.user.username ? (
            <button style={{ background: 'red' }} onClick={removeBlog}>
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
