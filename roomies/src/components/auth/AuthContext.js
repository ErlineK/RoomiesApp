import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const defaultUser = {
  _id: "111",
  name: "John Doe",
  avatar: "",
  brthDate: new Date(1988, 0, 30),
  email: "john@doe.com",
  phone: "555-555-5555"
};

export function AuthProvider(props) {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState("");
  const [houseId, setHouseId] = useState("111");

  const isLoggedIn = () => {
    // return user && user._id > 0;
    return token && user;
  };

  const loginUser = (user, token) => {
    setToken(token);
    setUser(user);
  };

  const logoutUser = (user, token) => {
    setToken(null);
    setUser(null);
  };

  const userId = () => {
    return user._id;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: token,
        userId: userId(),
        loginUser: loginUser,
        logoutUser: logoutUser,
        isLoggedIn: isLoggedIn,
        houseId: houseId,
        setHouseId: setHouseId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
