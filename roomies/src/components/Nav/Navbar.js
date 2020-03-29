import React, { useContext } from "react";
import "./side-nav.scss";
import "./navbar.scss";
import SideNav from "../Nav/NewSideNav";
import TopNav from "./TopNav";
import { AuthContext } from "../auth/AuthContext";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  // const guestNavItems = [{ title: "About", path: "About" }];
  const userTopNavItems = [
    {
      title: "Profile Settings",
      icon: "userCog",
      path: "Settings"
    },
    {
      title: "Notifications",
      icon: "notifications",
      path: "/"
    },
    {
      title: "Log Out",
      icon: "logout",
      path: "/",
      logout: true
    }
  ];

  /* important! keep title one word, so side nav css wont be broken */
  const userSideNavItems = [
    { title: "Home", path: "UserHome", icon: "home", color: "red" },
    { title: "Bills", path: "Bills", icon: "bills", color: "orange" },
    { title: "Chores", path: "Chores", icon: "chores", color: "blue" },
    {
      title: "Household",
      path: "HouseList",
      icon: "household",
      color: "green"
    },
    { title: "Chat", path: "GroupChat", icon: "chat", color: "red-light" }
  ];

  return isLoggedIn() ? (
    <>
      <TopNav navItems={userTopNavItems} />
      {/* <SideNav className="side-bar" navItems={userSideNavItems} /> */}
      <SideNav className="side-bar" navItems={userSideNavItems} />
    </>
  ) : (
    // <TopNav navItems={guestNavItems} />
    <div></div>
  );
}

export default Navbar;
