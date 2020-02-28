import React, { Component } from "react";
import "./navbar.scss";
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
    let navArray = this.props.cat.map(ni => (
      <div className="navLink-holder" key={uuid()}>
        <NavLink
          className="underline nav-link"
          activeClassName="active-page"
          to={`/${ni.path}`}
        >
          {ni.title}
        </NavLink>
      </div>
    ));
    return (
      <div className="side-nav">
        <div className="nav-content-holder">{navArray}</div>
      </div>
    );
  }
}

export default Navbar;
