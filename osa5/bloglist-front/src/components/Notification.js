import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(({ notification }) => {
    return {
      content: notification.content,
      isError: notification.isError,
    }
  })

  const notifType = notif.isError ? 'error' : 'success'
  return (
    <div style={{ height: '60px' }}>
      {notif.content === null ? null : (
        <Alert severity={notifType}>{notif.content}</Alert>
      )}
    </div>
  )
}

export default Notification
