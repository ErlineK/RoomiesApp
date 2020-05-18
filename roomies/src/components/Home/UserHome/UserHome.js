import React, { memo, useContext } from "react";
import "../home.scss";
import HomeMsgs from "./HomeMsgs";
import HomeBalance from "./HomeBalance";
import HomeBills from "./HomeBills";
import HomeChores from "./HomeChores";
// import { ChoresProvider } from "../../Chores/ChoresContext";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { HouseContext } from "../../UserSettings/House/HouseContext";
// import { BalanceProvider } from "../../Balance/BalanceContext";
// import useBalanceState from "../../../hooks/useBalanceState";
import { DashboardProvider, DashboardContext } from "./DashboardContext";

/**
 * Bills and Home Balance to be displayed only to logged users with an active houseId
 */
function UserHome() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { activeHouseId } = useContext(HouseContext);
  // const [data, requestStatus] = useBalanceState();
  // const { requestStatus } = useContext(DashboardContext);

  console.log("UserHomr is called");

  return (
    <>
      {isLoggedIn() ? (
        <div className=" user-main">
          {activeHouseId ? (
            <>
              <HomeBalance />
              <div className="flex-container flex-fill homeRow">
                <HomeMsgs />
                <HomeChores />
              </div>
              <HomeBills />
            </>
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
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default memo(UserHome);
