import React, { Component } from "react";
import "./Navbar.css";
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
            src={require("./london.jpg")}
            alt="application logo"
          />
        </NavLink>
      ) : (
        <NavLink
          key={uuid()}
          className="nav-link"
          activeClassName="active-page"
          to={`/${ni.path}`}
        >
          {ni.title}
        </NavLink>
      )
    );
    return <div className="navbar">{navArray}</div>;
  }
}

export default Navbar;
