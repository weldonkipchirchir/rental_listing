/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("a_user", null);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("user_LoggedIn", false);
  const [userInfo, setUserInfo] = useLocalStorage("user_Information", null);
 
  const value = useMemo(
    () => ({
      isLoggedIn,
      userInfo,
      setUserInfo,
      setIsLoggedIn,
      user,
      setUser
    }),
    [isLoggedIn, setIsLoggedIn, setUserInfo, userInfo, user, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}

const SetUserInfoAndLogin = (data) => {
  const { login, setUser, setUserInfo } = useAuth();
  setUser(data);
  setUserInfo(data);
  login(data);
};

export default SetUserInfoAndLogin;
