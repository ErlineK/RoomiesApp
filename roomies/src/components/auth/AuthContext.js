import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  // const [houseId, setHouseId] = useState();

  const isLoggedIn = () => {
    return user !== undefined && token !== undefined;
  };

  const loginUser = (user, token) => {
    console.log("setting new user");
    if (token && token !== "") {
      setToken(token);
    }
    setUser(user);
  };

  const logoutUser = () => {
    console.log("logging out user in Auth Context");
    setToken(undefined);
    setUser(undefined);
  };

  const userId = () => {
    return user ? user._id : "";
  };

  const requestHeader = () => {
    return {
      headers: { "Content-Type": "application/json", "x-auth-token": token }
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: token,
        requestHeader: requestHeader(),
        userId: userId(),
        loginUser: loginUser,
        logoutUser: logoutUser,
        isLoggedIn: isLoggedIn
        // houseId: houseId,
        // setHouseId: setHouseId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
