import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return action.payload;
  case "CLEAR_NOTIFICATION":
    return null;
  default:
    return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, notifDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, notifDispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

// custom hook to use the notification context
export const useNotification = () => useContext(NotificationContext);
