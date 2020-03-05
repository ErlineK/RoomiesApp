import React, { Component } from "react";
import "../../GenericComponents/general.scss";
import HomeMsgs from "./HomeMsgs";
import HomeStatus from "./HomeStatus";
import HomeBills from "./HomeBills";

class UserHome extends Component {
  render() {
    return (
      <div id="centralHolder" className="card">
        <h3>USER HOME</h3>
        <div className="flex-container">
          <HomeMsgs />
          <HomeStatus />
        </div>
        <HomeBills />
      </div>
    );
  }
}

export default UserHome;
