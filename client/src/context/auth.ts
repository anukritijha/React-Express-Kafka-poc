import { createContext, useContext } from "react";

export const AuthContext = createContext<any>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};
