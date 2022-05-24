import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    if (await dispatch(loginUser(credentials))) {
      dispatch(showNotification(`Logged in ${username}`, 4))
      setUsername('')
      setPassword('')
    } else {
      dispatch(showNotification('Wrong username or password', 3, 'error'))
    }
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          <span>Username: </span>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <span>Password: </span>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
