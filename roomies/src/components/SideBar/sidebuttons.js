import React, { Component } from "react";
import GenericButton from "../GenericComponents/GenericButton";
import { Link } from "react-router-dom";
import "./sidebuttons.css";

class SideButton extends Component {
  render() {
    return (
      <div className="leftButtons">
        <GenericButton buttonClass="sideButton" name="Chores" />
        <Link to="/Bills">
          <GenericButton buttonClass="sideButton" name="Bills" />
        </Link>
        <Link to="/HouseList">
          <GenericButton buttonClass="sideButton" name="HouseList" />
        </Link>
        <Link to="/About">
          <GenericButton buttonClass="sideButton" name="Profile" />
        </Link>
      </div>
    );
  }
}

export default SideButton;
