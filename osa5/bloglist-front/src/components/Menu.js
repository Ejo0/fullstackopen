import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div className="menu">
      <Link to="/">blogs</Link>
      <span> | </span>
      <Link to="/users">users</Link>
      <span> | </span>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Menu
