import { useEffect } from "react";
import service from "../services/service";
import { useNotification } from "../context/NotificationContext";

export const useLoginHandler = (dispatch) => {
  const { notifDispatch } = useNotification();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch({ type: "SET_USER", payload: user });
      service.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (loginObject) => {
    try {
      const user = await service.login(loginObject);
      dispatch({ type: "SET_USER", payload: user });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      service.setToken(user.token);
    } catch (exception) {
      notifDispatch({ type: "SET_NOTIFICATION", payload: "Wrong credentials" });
      setTimeout(() => {
        notifDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch({ type: "SET_USER", payload: null });
  };

  return { handleLogin, handleLogout };
};
