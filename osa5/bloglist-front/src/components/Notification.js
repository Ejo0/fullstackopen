import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(({ notification }) => {
    return {
      content: notification.content,
      isError: notification.isError,
    }
  })

  const notifType = notif.isError ? 'error' : 'notification'
  return notif.content === null ? null : (
    <p className={notifType}>{notif.content}</p>
  )
}

export default Notification
