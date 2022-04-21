import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm"
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setNotification(`Logged in ${user.name}`)
      setTimeout(() => {setNotification(null)}, 4000);

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

      setIsError(true)
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
        setIsError(false)
      }, 4000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
  
      setNotification(`Created new blog '${newBlog.title}' by ${newBlog.author}`)
      setTimeout(() => setNotification(null), 5000)
    
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {

      setIsError(true)
      setNotification('Title, author and url required')
      setTimeout(() => {
        setNotification(null)
        setIsError(false)
      }, 4000)
    }

  }

  return (user)
    ? (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} isError={isError}/>
      <p>{user.name} logged in <button onClick={handleLogout} >Logout</button></p>
      <h2>Create new</h2>
      <BlogForm 
        handleCreateBlog={handleCreateBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
   : (
     <div>
       <h2>Log in to application</h2>
       <Notification message={notification} isError={isError}/>
       <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
     </div>
   )
}


export default App;
