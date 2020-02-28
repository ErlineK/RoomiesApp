import React, { Component } from "react";
import "./side-nav.scss";
import { NavLink } from "react-router-dom";
import uuid from "uuid";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [this.props.cat]
    };
  }

  render() {
    let navArray = this.props.cat.map(ni =>
      ni.title === "Logo" ? (
        <NavLink key={uuid()} to={`/${ni.path}`}>
          <img
            className="navLogo"
            src={require("../../assets/Logo.svg")}
            alt="application logo"
          />
        </NavLink>
      ) : (
        <div className="navLink-holder" key={uuid()}>
          <NavLink
            className="underline nav-link"
            activeClassName="active-page"
            to={`/${ni.path}`}
          >
            {ni.title}
          </NavLink>
        </div>
      )
    );
    return <div className="navbar">{navArray}</div>;
  }
}

export default Navbar;
