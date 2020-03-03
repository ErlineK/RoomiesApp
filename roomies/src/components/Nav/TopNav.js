import React, { useContext } from "react";
import "./side-nav.scss";
import "./navbar.scss";
import { NavLink, Link } from "react-router-dom";
import uuid from "uuid";
import { FaUserCog, FaBell, FaPowerOff } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

import { AuthContext } from "../auth/AuthContext";

function TopNav(props) {
  const { isLoggedIn, setUserId } = useContext(AuthContext);

  function getIconByName(iconName) {
    let iconObj;
    switch (iconName) {
      case "userCog":
        iconObj = <FaUserCog className="top-nav-icon" />;
        break;

      case "notifications":
        iconObj = <FaBell className="top-nav-icon" />;
        break;

      case "logout":
        iconObj = <AiOutlineLogout className="top-nav-icon" />;
        break;

      default:
        break;
    }

    return iconObj;
  }

  let navArray = props.navItems.map(ni =>
    ni.logout ? (
      <div className="navLink-holder" key={uuid()}>
        <AiOutlineLogout
          className="top-nav-icon nav-icon-margin-fix"
          onClick={() => setUserId("")}
        />
      </div>
    ) : (
      <div className="navLink-holder" key={uuid()}>
        <Link
          key={uuid()}
          to={`/${ni.path}`}
          className={ni.icon ? "" : "underline nav-link"}
        >
          {ni.icon ? getIconByName(ni.icon) : ni.title}
        </Link>
      </div>
    )
  );
  return (
    <div className="navbar user-nav">
      {isLoggedIn() && (
        <NavLink key={uuid()} to={"/"}>
          <img
            className="navLogo"
            src={require("../../assets/Logo.svg")}
            alt="application logo"
          />
        </NavLink>
      )}
      <div className={isLoggedIn() ? "user-navLink-holder" : ""}>
        {navArray}
      </div>
    </div>
  );
}

export default TopNav;
