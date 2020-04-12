import React, { useContext, useState } from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { MdArrowBack } from "react-icons/md";
import { BASE_URL } from "../../utils/AppParams";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import axios from "axios";

// TODO: add loader

function Login() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [srvError, setSrvError] = useState();
  const [
    email,
    handleEmailChange,
    setEmail,
    resetEmail,
    validateEmail,
    emailError
  ] = useInputState("master@puppets.com", "EMAIL");
  const [
    password,
    handlePassChange,
    setPass,
    resetPass,
    validatePass,
    passError
  ] = useInputState("Qwer1234", "PASS");
  const { loginUser } = useContext(AuthContext);

  const validated = () => {
    let validated = false;
    validated = validateEmail();
    if (validated) {
      validated = validatePass();
    }
    return true;
  };

  const doSubmit = event => {
    event.preventDefault();

    if (validated()) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    // call Login WSH, get user and token in return.
    setLoading(true);
    setSrvError(undefined);

    axios
      .post(`${BASE_URL}/auth`, { email: email, password: password })
      .then(res => {
        console.log("Logged In successfully");
        console.log(res);
        //  save user and token to context
        loginUser(res.data.user, res.data.token);

        // reset fields
        resetEmail();
        resetPass();

        // redirect home
        history.push("/UserHome");
        // <Redirect to={"/UserHome"} />;
      })
      .catch(error => {
        setLoading(false);
        console.log("Login Error: ");
        console.log(error.response.data.error);
        setSrvError(error.response.data.error);
      });
  };

  const serverError = srvError ? (
    <div className="alert alert-danger" role="alert">
      {srvError}
    </div>
  ) : (
    ""
  );

  return (
    <div className="homeContainer guestBackground">
      <div className=" from-container">
        <Link className="secondary-link toLeft" to="/">
          <MdArrowBack className="back-icon" /> back
        </Link>

        <form className="card" onSubmit={doSubmit}>
          {serverError}
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
          />
          <div className="invalid-feedback">{emailError}</div>

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
          />
          <div className="invalid-feedback">{passError}</div>

          {isLoading ? (
            <CircleLoader />
          ) : (
            <button type="submit" className="btn btn-grad-pressed">
              Log In
            </button>
          )}
        </form>

        <Link className="secondary-link" to="/Registration">
          New here? Create account
        </Link>
      </div>
    </div>
  );
}

export default Login;
