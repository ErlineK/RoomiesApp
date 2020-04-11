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
  // const [userId, setUserId] = useState("111");
  const [houseId, setHouseId] = useState("111");

  const isLoggedIn = () => {
    return user && user._id > 0;
  };

  const userId = () => {
    return user._id;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        setUser: setUser,
        userId: userId(),
        // setUserId: setUserId,
        houseId: houseId,
        setHouseId: setHouseId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
