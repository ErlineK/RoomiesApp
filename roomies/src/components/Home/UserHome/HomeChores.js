import React, { useReducer, useEffect, memo, useContext } from "react";
import "../../GenericComponents/general.scss";
import { Link } from "react-router-dom";
import HomeFragment from "./HomeFragment";
import HomeChoreItem from "../../Chores/HomeChoreItem";
import choresReducer from "../../../reducers/chores.reducer.js";
import { ChoresContext } from "../../Chores/ChoresContext";
import useChoresState from "../../../hooks/useChoresState";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";
const defaultData = {
  isLoading: true,
  isError: false,
  chores: [
    {
      _id: 1,
      leader: "Tenant 1",
      task: "Do dishes",
      dueDate: new Date(2020, 4, 30),
      complete: false
    },
    {
      _id: 2,
      leader: "Tenant 1",
      task: "Get toilet paper",
      dueDate: new Date(2020, 4, 16),
      complete: true
    },
    {
      _id: 3,
      leader: "Tenant 1",
      task: "Save the world",
      dueDate: new Date(2020, 4, 1),
      complete: false
    },
    {
      _id: 4,
      leader: "Tenant 1",
      task: "Sweep floor",
      dueDate: new Date(2020, 3, 25),
      complete: false
    }
  ]
};

// TODO: get USER'S last 5 chores by due date

function HomeChores() {
  // const { choresState, choresDispatch } = useContext(ChoresContext);
  const { chores, choresActions, requestStatus } = useChoresState(
    defaultData.chores
  );

  useEffect(() => {
    console.log(requestStatus);

    console.log("calling get all chores from home");
    console.log(chores);
    // choresActions.getAllChores();
    console.log(chores);
  }, []);

  const choreItems =
    chores !== undefined
      ? chores.map(chore => (
          <div key={`holder${chore._id}`}>
            <HomeChoreItem
              item={chore}
              // toggleChore={() =>
              //   choresDispatch({
              //     type: "TOGGLE",
              //     id: chore._id,
              //     complete: !chore.complete
              //   })
              // }
            />
          </div>
        ))
      : "";

  return (
    <div className="card">
      <HomeFragment
        // isLoading={requestStatus.isLoading}
        // isError={requestStatus.isError}
        isLoading={false}
        isError={false}
        // noData={chores == "undefined" || chores.length < 1}
        noData={true}
        title={"Your Chores"}
        itemsName={"chores"}
      >
        <div className="listContainer">
          {/* <div className="titleContainer">Your Chores</div> */}
          {choreItems}
        </div>
      </HomeFragment>

      <Link className="secondary-link underline nav-link" to="/Chores">
        All chores >>
      </Link>
    </div>
  );
}

export default memo(HomeChores);
