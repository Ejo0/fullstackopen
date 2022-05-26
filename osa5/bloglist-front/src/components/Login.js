import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

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
          <TextField
            label="Username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={{ paddingBottom: '10px' }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ paddingBottom: '10px' }}
          />
        </div>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
