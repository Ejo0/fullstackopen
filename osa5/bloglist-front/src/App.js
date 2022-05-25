import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { getBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())

    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  const userMatch = useMatch('/users/:id')
  const viewedUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const viewedBlog = blogMatch
    ? blogs.find((u) => u.id === blogMatch.params.id)
    : null

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
      <Routes>
        <Route path="/users/:id" element={<User user={viewedUser} />} />
        <Route
          path="/blogs/:id"
          element={
            viewedBlog ? (
              <Blog blog={viewedBlog} user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            <div>
              <h2>Create new</h2>
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Togglable>
              <br />
              <BlogList user={user} />
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
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
