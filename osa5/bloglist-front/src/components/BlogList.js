import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, List, ListItemText, Paper } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div>
      <List component={Paper}>
        {blogs.map((blog) => (
          <ListItemText key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
              {blog.title}
            </Link>
            <Divider />
          </ListItemText>
        ))}
      </List>
    </div>
  )
}

export default BlogList
