import React, { createContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/AppParams";

export const AuthContext = createContext();

// TODO: create user state

export function AuthProvider(props) {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  // const [houseId, setHouseId] = useState();

  const isLoggedIn = () => {
    return user !== undefined && token !== undefined;
  };

  const loginUser = (user, token) => {
    // console.log("setting new user");
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

  const getUserData = () => {
    axios
      .get(`${BASE_URL}/auth/${userId()}`, requestHeader)
      .then((res) => {
        console.log("Getting user data:");
        console.log(res);
        //  save user and token to context
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const acceptHouseInv = (houseId, accept) => {
    axios
      .patch(
        `${BASE_URL}/houses/accept/${userId()}/${houseId}`,
        {
          accepted: accept,
          viewed: true,
        },
        requestHeader
      )
      .then((res) => {
        // console.log("Getting user data:");
        // console.log(res);
        // save user
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const userId = () => {
    return user ? user._id : "";
  };

  const requestHeader = {
    headers: { "Content-Type": "application/json", "x-auth-token": token },
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: token,
        requestHeader: requestHeader,

        loginUser: loginUser,
        logoutUser: logoutUser,
        isLoggedIn: isLoggedIn,

        userId: userId(),
        getUserData: getUserData,

        acceptHouseInv: acceptHouseInv,
        // houseId: houseId,
        // setHouseId: setHouseId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
