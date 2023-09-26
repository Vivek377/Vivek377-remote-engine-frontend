import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginUser = (t) => {
    setIsAuth(true);
  };

  const value = {
    loginUser,
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;