import React, { Component } from "react";
import "./side-nav.scss";
import { NavLink, Link } from "react-router-dom";
import uuid from "uuid";
import { FaUserCog, FaBell } from "react-icons/fa";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const defaultProps = {
      navItems: [
        {
          id: uuid(),
          title: "Profile Settings",
          icon: "userCog",
          path: "/Profile"
        },
        {
          id: uuid(),
          title: "Notifications",
          icon: "notifications",
          path: "/"
        }
      ]
    };

    function getIconByName(iconName) {
      let iconObj;
      switch (iconName) {
        case "userCog":
          iconObj = <FaUserCog className="top-nav-icon" />;
          break;

        case "notifications":
          iconObj = <FaBell className="top-nav-icon" />;
          break;
      }

      return iconObj;
    }

    let navArray = defaultProps.navItems.map(ni => (
      <Link key={uuid()} to={`/${ni.path}`}>
        {getIconByName(ni.icon)}
      </Link>
    ));
    return (
      <div className="navbar user-nav">
        <NavLink key={uuid()} to={"/"}>
          <img
            className="navLogo"
            src={require("../../assets/Logo.svg")}
            alt="application logo"
          />
        </NavLink>
        <div className="user-navLink-holder">{navArray}</div>
      </div>
    );
  }
}

export default Navbar;
