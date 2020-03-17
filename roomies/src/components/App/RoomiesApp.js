import React, { useContext } from "react";
import "./app.scss";
import Navbar from "../Nav/Navbar";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {/* <div className={isLoggedIn() ? "userBackground" : " guestBackground"}> */}
      {/* <Navbar /> */}

      {isLoggedIn() ? <Redirect to="/UserHome" /> : <Redirect to="/" />}
    </div>
  );
}
