import { useNotification } from "../context/NotificationContext";
import { Alert } from "@mui/material";

const Notification = () => {
  const { notification } = useNotification();

  if (notification === null) {
    return null;
  }

  if (notification.includes("added")) {
    return <Alert severity="success"> {notification} </Alert>;
  }

  return <Alert severity="error"> {notification} </Alert>;
};

export default Notification;
