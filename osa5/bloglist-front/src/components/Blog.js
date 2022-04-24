import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [fullView, setFullView] = useState(false)

  const toggleFullView = () => setFullView(!fullView)
  const addLike = () => handleLike(blog)
  const remove = () => handleRemove(blog)

  return (
    <div className="blog">
      {blog.title}; {blog.author}
      <button onClick={toggleFullView}>{fullView ? 'Hide' : 'View'}</button><br/>
      {fullView
        ? (
          <div>
            {blog.url}<br/>
                        Likes: {blog.likes}
            <button onClick={addLike}>Like</button><br/>
            {blog.user.name}<br/>
            {(user.username === blog.user.username)
              ? <button
                style={{ background: 'red' }}
                onClick={remove}>
                                Remove
              </button>
              : null}
          </div>
        )
        : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog