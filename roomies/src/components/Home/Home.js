import React, { Component } from "react";
import "../GenericComponents/general.scss";
import "./home.css";
import "../GenericComponents/general.scss";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <div id="centralHolder">
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
}

export default Home;
