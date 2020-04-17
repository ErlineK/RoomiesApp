import React, { memo, useContext } from "react";
// import "../../GenericComponents/general.scss";
import "../home.scss";
import HomeMsgs from "./HomeMsgs";
import HomeStatus from "./HomeStatus";
import HomeBills from "./HomeBills";
import HomeChores from "./HomeChores";
import { ChoresProvider } from "../../Chores/ChoresContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { HouseContext } from "../../UserSettings/House/HouseContext";

/**
 * Bills and Home Balance to be displayed only to logged users with an active houseId
 */
function UserHome() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { activeHouseId } = useContext(HouseContext);
  return (
    <div className=" user-main">
      {isLoggedIn() && activeHouseId ? (
        <HomeStatus />
      ) : (
        <div className="card" style={{ margin: "0.1rem" }}>
          <div className="homePersonalContainer">
            <h2 className="homeMainTitle">Hi {user ? user.name : ""}! </h2>
            <Link className="secondary-link" to="/Settings">
              Would you like to open a new Roomies house?
            </Link>
          </div>
        </div>
      )}
      <div className="flex-container flex-fill homeRow">
        <HomeMsgs />
        <ChoresProvider>
          <HomeChores />
        </ChoresProvider>
      </div>
      {isLoggedIn() && activeHouseId && <HomeBills />}
    </div>
  );
}

export default memo(UserHome);
