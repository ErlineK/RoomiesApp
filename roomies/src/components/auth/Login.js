import React, { useContext } from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Login() {
  const [email, handleEmailChange, resetEmail, validateEmail] = useInputState(
    "me@roomies.ca"
  );
  const [password, handlePassChange, resetPass, validatePass] = useInputState(
    "111111"
  );
  const { setUserId } = useContext(AuthContext);

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
    // TODO: call Login WSH, get userId in return.
    // axios
    //   .post("http://localhost:3000/users/login", userObject)
    //   .then(res => {
    console.log("Logged In successfully");
    //    save userId to global context
    setUserId("1111");
    //    window.localStorage.setItem("userId", { res.data.userId });
    //     //TODO: redirect to thank you page with login
    // <Redirect to={"/UserHome"} />;
    //   })
    //   .catch(error => {
    //     console.log("Login Error");
    // TODO: display errors
    // resetEmail();
    // resetPass();
    //   });
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
      <Link className="secondary-link" to="/Registration">
        New here? Create account
      </Link>
    </div>
  );
}

export default Login;
