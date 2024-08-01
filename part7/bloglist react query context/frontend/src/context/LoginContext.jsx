import { createContext, useReducer, useContext } from "react";

const LoginContext = createContext();

const loginReducer = (state, action) => {
  switch (action.type) {
  case "SET_USER":
    return action.payload;
  default:
    return state;
  }
};

export const LoginProvider = ({ children }) => {
  const [user, loginDispatch] = useReducer(loginReducer, null);

  return (
    <LoginContext.Provider value={{ user, loginDispatch }}>
      {children}
    </LoginContext.Provider>
  );
};

// custom hook to use the login context
export const useLogin = () => useContext(LoginContext);
