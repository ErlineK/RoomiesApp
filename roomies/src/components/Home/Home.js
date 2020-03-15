import React from "react";
import "../GenericComponents/general.scss";
import "./home.scss";
import "../GenericComponents/general.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="home-central-holder">
        <img
          className="homeLogo"
          src={require("../../assets/Logo.svg")}
          alt="application logo"
        />
        <h1>Roomies</h1>
        <hr></hr>
        <h4>Manage shared expenses together</h4>
        <div id="buttonsHolder" className="buttonsHolder">
          <Link className="btn btn-grad " to="/Registration">
            Register
          </Link>
          <Link className="btn btn-grad" to="/Login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
