import React, { useState, useContext } from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";
import { Link, useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { AuthContext } from "../auth/AuthContext";
import { BASE_URL } from "../../utils/AppParams";
import axios from "axios";

function Registration() {
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [
    name,
    handleNameChange,
    setName,
    resetName,
    validateName
  ] = useInputState("", "NAME");
  const [
    email,
    handleEmailChange,
    setEmail,
    resetEmail,
    validateEmail
  ] = useInputState("", "EMAIL");
  const [
    password,
    handlePassChange,
    setPass,
    resetPass,
    validatePass
  ] = useInputState("", "PASS");
  const [
    passConfirm,
    handlePassConfirmChange,
    setPassConfirm,
    resetPassConfirm
  ] = useInputState("", "PASS");

  const handleRegistration = () => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/users`, { email, password })
      .then(res => {
        console.log("Registered successfully");
        //  save user and token to context
        loginUser(res.user, res.token);

        // redirect home
        // TODO: redirect to CreateProfile
        history.push("/UserHome");
        // <Redirect to={"/UserHome"} />;
      })
      .catch(error => {
        setLoading(false);
        console.log("Login Error: " + error);
        // TODO: display errors
      });
  };

  const validated = () => {
    let validated = true;
    /** TODO: Consider adding validation to input state hook */
    //TODO: validate data
    validated = validateEmail();
    if (!validated) {
      // TODO: dispaly email error
      console.log("email validation fail");
    } else {
      validated = validateName();
      if (!validated) {
        // TODO: display name errors
        console.log("name validation fail");
      } else {
        validated = validatePass();
        if (!validated) {
          // TODO: display password error
          console.log("passwors validation fail");
        } else if (password !== passConfirm) {
          validated = false;
          if (!validated) {
            console.log("pass confirm validation fail");
            // TODO: display pass confirm error
          }
        }
      }
    }
    return validated;
  };

  const doSubmit = event => {
    //This will handle the form data
    console.log("register form submit");
    event.preventDefault();

    /** TODO: Consider adding validation to input state hook */
    if (validated()) {
      handleRegistration();
      resetName();
      resetEmail();
      resetPass();
      resetPassConfirm();
    } else {
      console.log("validation fail");
    }
  };

  return (
    <div className="homeContainer guestBackground">
      <div className="from-container">
        <Link className="secondary-link toLeft" to="/">
          <MdArrowBack className="back-icon" /> back
        </Link>

        {isLoading ? (
          "Loading..."
        ) : (
          <form className="card" onSubmit={doSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={handleNameChange}
              required
            />

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

            <input
              type="password"
              name="password_confirm"
              placeholder="Confirm Password"
              className="form-control input-margin"
              value={passConfirm}
              onChange={handlePassConfirmChange}
              required
            />
            <button type="submit" className="btn btn-grad-pressed">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registration;
