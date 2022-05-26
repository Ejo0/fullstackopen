import { List, ListItemText, Typography } from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <Typography sx={{ mb: 5 }} variant="h2">
        {user.name}
      </Typography>
      <Typography variant="h4">Added blogs:</Typography>
      <List>
        {user.blogs.map((b) => (
          <ListItemText key={b.id}>{b.title}</ListItemText>
        ))}
      </List>
    </div>
  )
}

export default User
