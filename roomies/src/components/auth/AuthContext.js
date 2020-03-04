import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [userId, setUserId] = useState("111");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: () => {
          return userId > 0;
        },
        userId: userId,
        setUserId: setUserId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
