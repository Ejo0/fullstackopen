import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(({ users }) => {
    return users
  })

  return (
    <div>
      <h2>Users</h2>
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <th>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </th>
              <th>{u.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
