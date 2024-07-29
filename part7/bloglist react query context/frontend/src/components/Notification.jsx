import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (notification === null) {
    return null
  }

  if (notification.includes('added')) {
    return <div className="blog">{notification}</div>
  }

  return <div className="error">{notification}</div>
}

export default Notification
