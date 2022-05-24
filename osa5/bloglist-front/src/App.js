import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { getBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())

    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const user = useSelector(({ user }) => {
    return user
  })

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
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
      <Login />
    </div>
  )
}

export default App
