import React, { Component, useState } from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, handleEmailChange, resetEmail] = useInputState("me@roomies.ca");
  const [password, handlePassChange, resetPass] = useInputState("111111");

  const validated = () => {
    /** TODO: Consider adding validation to input state hook */
    //TODO: validate data
    return true;
  };

  const doSubmit = event => {
    console.log("clicked login");
    event.preventDefault();

    if (validated()) {
      /** Consider adding validation to input state hook */
      // call to login WS goes here
      handleLogin();
      resetEmail();
      resetPass();
    }
  };

  return (
    <div className=" from-container">
      <form className="card" onSubmit={doSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={handleEmailChange}
          required
          value={email}
        />

        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={handlePassChange}
          required
          value={password}
        />

        <button type="submit" className="btn btn-grad-pressed">
          Log In
        </button>
      </form>
      <Link className="secondary-link" to="/Registration">
        New here? Create account
      </Link>
    </div>
  );
}

export default Login;
