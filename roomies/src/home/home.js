import React, { Component } from "react";
import "../general.css";
import "./home.css";
import Registration from "../auth/Registration";
import { Switch, Route, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="centralHolder">
          <img
            className="homeLogo"
            src={require("../london.jpg")}
            alt="application logo"
          />
          <h3>Roomie App</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore.
          </p>
          <div id="buttonsHolder" className="buttonsHolder">
            <Link className="btn btn-primary" to="/Registration">
              Register
            </Link>
            {/* <button onClick={this.goToRegister}>Register</button> */}
            <Link className="btn btn-secondary" to="/Login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
