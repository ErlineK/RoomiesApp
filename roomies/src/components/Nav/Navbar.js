import React, { useContext } from "react";
import "./side-nav.scss";
import "./navbar.scss";
import SideNav from "../Nav/SideNav";
import TopNav from "./TopNav";
import { AuthContext } from "../auth/AuthContext";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  const guestNavItems = [{ title: "About", path: "About" }];
  const userTopNavItems = [
    {
      title: "Profile Settings",
      icon: "userCog",
      path: "/Profile"
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
    { title: "Bills", path: "Bills" },
    { title: "Chores", path: "About" },
    { title: "Household", path: "HouseList" },
    { title: "Chat", path: "GroupChat" }
  ];

  return isLoggedIn() ? (
    <>
      <TopNav navItems={userTopNavItems} />
      <SideNav className="side-bar" navItems={userSideNavItems} />
    </>
  ) : (
    <TopNav navItems={guestNavItems} />
  );
}

export default Navbar;
