import React from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";
import { Link } from "react-router-dom";

function Registration({ handleRegistration }) {
  const [email, handleEmailChange, resetEmail, validateEmail] = useInputState(
    ""
  );
  const [password, handlePassChange, resetPass, validatePass] = useInputState(
    ""
  );
  const [
    passConfirm,
    handlePassConfirmChange,
    resetPassConfirm,
    validatePassConfirm
  ] = useInputState("");

  const validated = () => {
    let validated = true;
    /** TODO: Consider adding validation to input state hook */
    //TODO: validate data
    validated = validateEmail("EMAIL");
    if (!validated) {
      // TODO: dispaly email error
    } else {
      validated = validatePass("PASS");
      if (!validated) {
        // TODO: display password error
      } else if (password !== passConfirm) {
        validated = false;
        if (!validated) {
          // TODO: display pass confirm error
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
      resetEmail();
      resetPass();
      resetPassConfirm();
    }
  };

  return (
    <div className="from-container">
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
    </div>
  );
}

export default Registration;
