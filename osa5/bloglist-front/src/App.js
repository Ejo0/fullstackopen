import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(showNotification(`Logged in ${user.name}`, 4))
      setUser(user)
      return true
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', 3, 'error'))
      return false
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))

      dispatch(
        showNotification(
          `Created new blog '${newBlog.title}' by ${newBlog.author}`,
          5
        )
      )
      return true
    } catch (exception) {
      dispatch(showNotification('Title, author and url required', 4, 'error'))
      return false
    }
  }

  const handleLike = async (blog) => {
    const likedBlog = await blogService.like(blog)
    setBlogs(
      blogs
        .map((b) => (b.id === likedBlog.id ? likedBlog : b))
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const responseStatus = await blogService.remove(blog)
      if (responseStatus === 204) {
        setBlogs(
          blogs
            .filter((b) => b.id !== blog.id)
            .sort((a, b) => b.likes - a.likes)
        )
        dispatch(showNotification('Blog removed', 4))
      }
      if (responseStatus === 401) {
        dispatch(showNotification('Unauthorized', 4, 'error'))
      }
    }
  }

  const blogFormRef = useRef()

  return user ? (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create new</h2>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          user={user}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  ) : (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Login handleLogin={handleLogin} />
    </div>
  )
}

export default App
