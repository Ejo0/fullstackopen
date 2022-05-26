import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <AppBar sx={{ mb: 2 }} color="secondary" position="static">
      <Toolbar>
        <Button sx={{ mr: 2 }} color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          <div style={{ flexGrow: 1 }}></div>
          Users
        </Button>
        <Typography sx={{ flexGrow: 1 }}></Typography>
        <Typography>{user.name} logged in | </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
