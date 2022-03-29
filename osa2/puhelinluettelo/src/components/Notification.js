const Notification = ({message, isError}) => {
    const notifType = isError ? 'error' : 'notification'
    if (message == null) {
        return null
    }
    return (
        <p className={notifType}>
            {message}
        </p>
    )
}

export default Notification
