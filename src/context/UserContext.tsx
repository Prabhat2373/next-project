import { User } from "@/types/interface";
import React from "react";

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  signin: (loginUser: User, token: string) => void;
}

const UserContext = React.createContext<UserContextType>(null!);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const signin = (loginUser: User, token: string) => {
    setUser(loginUser);
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };
  const value = {
    user,
    isLoggedIn,
    signin,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(UserContext);
};
