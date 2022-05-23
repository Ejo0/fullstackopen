import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import { getBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(getBlogs())
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
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <br />
      <BlogList user={user} />
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
