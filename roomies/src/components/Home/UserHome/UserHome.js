import React, { Component, memo } from "react";
// import "../../GenericComponents/general.scss";
import "../home.scss";
import HomeMsgs from "./HomeMsgs";
import HomeStatus from "./HomeStatus";
import HomeBills from "./HomeBills";
import HomeChores from "./HomeChores";
import { ChoresProvider } from "../../Chores/ChoresContext";

class UserHome extends Component {
  render() {
    return (
      <div className="card user-main">
        <HomeStatus />

        <div className="flex-container flex-fill homeRow">
          <HomeMsgs />
          <ChoresProvider>
            <HomeChores />
          </ChoresProvider>
        </div>
        <HomeBills />
      </div>
    );
  }
}

export default memo(UserHome);
