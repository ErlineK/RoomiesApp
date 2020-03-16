import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [userId, setUserId] = useState("111");

  const isLoggedIn = () => {
    return userId > 0;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        setUserId: setUserId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
