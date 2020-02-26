import React from "react";
import useInputState from "../../hooks/useInputState";
import "./auth.scss";

function Registration({ handleRegistration }) {
  const [email, handleEmailChange, resetEmail] = useInputState("");
  const [password, handlePassChange, resetPass] = useInputState("");
  const [
    passConfirm,
    handlePassConfirmChange,
    resetPassConfirm
  ] = useInputState("");

  const validated = () => {
    /** TODO: Consider adding validation to input state hook */
    //TODO: validate data
    return true;
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
      <form onSubmit={doSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
