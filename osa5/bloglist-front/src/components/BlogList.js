import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div>
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList

// Towerz x hi jude -empty spaces
