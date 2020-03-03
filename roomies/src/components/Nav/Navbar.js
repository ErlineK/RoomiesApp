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
  const userSideNavItems = [
    { title: "Bills", path: "Bills" },
    { title: "House Keeping", path: "HouseList" },
    { title: "Chores", path: "About" },
    { title: "Chat", path: "GroupChat" },
    { title: "Profile Settings", path: "Profile" }
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
