import { useNotificationValue, useNotificationDispatch } from "./NotificationContext";

const Notification = () => {
  const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5
  }

  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  if (notification) {
    setTimeout(() => {
        dispatch({ type: "CLEAR" })
    }, 5000)
  } else if (!notification) {
      return null
  }

  return (
      <div style={style}>
          {notification}
      </div>
  )
}

export default Notification