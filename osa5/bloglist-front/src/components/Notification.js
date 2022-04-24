const Notification = ({message, isError}) => {
    const notifType = isError ? 'error' : 'notification'
    return (message === null)
        ? null
        : (
            <p className={notifType}>
                {message}
            </p>
        )
}

export default Notification
