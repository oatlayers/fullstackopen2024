import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification.message)

  if (notification === null) {
    return null
  }

  if (notification.includes('added')) {
    return <div className="blog">{notification}</div>
  }

  return <div className="error">{notification}</div>
}

export default Notification
