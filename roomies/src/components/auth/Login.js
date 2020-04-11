import React, { useContext, useState } from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { MdArrowBack } from "react-icons/md";
import { BASE_URL } from "../../utils/AppParams";
import axios from "axios";

// TODO: add loader

function Login() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [email, handleEmailChange, resetEmail, validateEmail] = useInputState(
    "me@roomies.ca",
    "EMAIL"
  );
  const [password, handlePassChange, resetPass, validatePass] = useInputState(
    "111111",
    "PASS"
  );
  const { loginUser } = useContext(AuthContext);

  const validated = () => {
    let validated = false;
    validated = validateEmail();
    if (validated) {
      validated = validatePass;
    }
    return true;
  };

  const doSubmit = event => {
    event.preventDefault();

    if (validated()) {
      handleLogin();

      // TODO: remove these after WS implementation
      resetEmail();
      resetPass();
    }
  };

  const handleLogin = () => {
    // call Login WSH, get user and token in return.
    setLoading(true);

    axios
      .post(`${BASE_URL}/auth/user`, { email, password })
      .then(res => {
        console.log("Logged In successfully");
        //  save user and token to context
        loginUser(res.user, res.token);

        // redirect home
        history.push("/UserHome");
        // <Redirect to={"/UserHome"} />;
      })
      .catch(error => {
        setLoading(false);
        console.log("Login Error: " + error);
        // TODO: display errors
      });
  };

  return (
    <div className="homeContainer guestBackground">
      <div className=" from-container">
        <Link className="secondary-link toLeft" to="/">
          <MdArrowBack className="back-icon" /> back
        </Link>

        {isLoading ? (
          "Loading..."
        ) : (
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
            />

            <button type="submit" className="btn btn-grad-pressed">
              Log In
            </button>
          </form>
        )}
        <Link className="secondary-link" to="/Registration">
          New here? Create account
        </Link>
      </div>
    </div>
  );
}

export default Login;
