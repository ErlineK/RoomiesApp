import React, { useState, useContext } from "react";
import useInputState from "../../hooks/useInputState";
import { Link } from "react-router-dom";
import "./profile.scss";
import { AuthContext } from "../auth/AuthContext";
import { MdArrowForward } from "react-icons/md";

// TODO: add loader

export default function CreateProfile() {
  const { user, loginUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [phone, handlePhoneChange, resetPhone, validatePhone] = useInputState(
    "",
    "PHONE"
  );
  const [brthDate, handleBDayChange, validateBDay] = useInputState(
    "",
    "B_DATE"
  );
  const [avatar, handleAvatarChange] = useState(user.avatar);

  const doSubmit = () => {
    // TODO: Validate

    handleCreateProfile();
  };

  const handleCreateProfile = () => {
    setLoading(true);

    // TODO: upload avatar

    axios
      .post(`${BASE_URL}/users/profile`, { phone, brthDate, avatar })
      .then(res => {
        console.log("Registered successfully");
        //  save user and token to context
        loginUser(res.user, res.token);

        // redirect home
        <Redirect to={"/UserHome"} />;
      })
      .catch(error => {
        setLoading(false);
        console.log("Login Error: " + error);
        // TODO: display errors
      });
  };

  return (
    <div>
      <div className="homeContainer guestBackground">
        <div className="from-container">
          <Link className="secondary-link toRight" to="/">
            <MdArrowForward className="back-icon" /> skip
          </Link>

          <h4>{`Hi! ${user.name}! Welcome home.`}</h4>
          <p> Would you like share few details with your roomies?</p>

          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <UserAvatarSettings avatar={avatar} />
              <form className="card" onSubmit={doSubmit}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />

                <label htmlFor="email">Birthday</label>
                <input
                  id="brthDate"
                  type="date"
                  name="brthDate"
                  placeholder="Birthday"
                  className="form-control"
                  value={brthDate}
                  onChange={handleBDayChange}
                  required
                />

                <button type="submit" className="btn btn-grad-pressed">
                  Save
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
