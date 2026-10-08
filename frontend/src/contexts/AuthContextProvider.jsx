import { AuthContext } from "./AuthContext";
export const AuthContextProvider = ({ children }) => {
  const user = {
    name: "Khant Htoo Lwin",
  };
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
