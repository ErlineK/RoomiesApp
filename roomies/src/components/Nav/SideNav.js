import React, { Component } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import uuid from "uuid";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [this.props.navItems]
    };
  }

  render() {
    let navArray = this.props.navItems.map(ni => (
      <div className="navLink-holder" key={uuid()}>
        <NavLink
          className="nav-link"
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

export default SideNav;
