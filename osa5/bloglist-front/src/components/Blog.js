import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { remove, like } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const addLike = () => dispatch(like(blog))
  const removeBlog = () => dispatch(remove(blog))

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      Likes: {blog.likes}
      <button onClick={addLike}>Like</button>
      <br />
      Added by {blog.user.name}
      <br />
      {user.username === blog.user.username ? (
        <button style={{ background: 'red' }} onClick={removeBlog}>
          Remove
        </button>
      ) : null}
      <h3>Comments:</h3>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
