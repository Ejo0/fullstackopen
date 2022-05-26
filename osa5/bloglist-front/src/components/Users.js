import {
  TableContainer,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(({ users }) => {
    return users
  })

  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <TableContainer component={Paper} style={{ textAlign: 'left' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link
                    to={`/users/${u.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {u.name}
                  </Link>
                </TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
