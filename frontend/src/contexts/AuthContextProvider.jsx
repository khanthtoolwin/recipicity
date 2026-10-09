import React from "react";
import { AuthContext } from "./AuthContext";
export const AuthContextProvider = ({ children }) => {
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        // console.log("action hit", action.payload);
        return { user: action.payload };
      case "LOGOUT":
        // console.log("logout ation hit");
        return { user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(AuthReducer, { user: null });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
