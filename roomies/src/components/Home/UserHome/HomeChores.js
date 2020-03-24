import React, { useReducer, useEffect } from "react";
import "../../GenericComponents/general.scss";
import { Link } from "react-router-dom";
import HomeFragment from "./HomeFragment";
import HomeChoreItem from "../../Chores/HomeChoreItem";
import choresReducer from "../../../reducers/chores.reducer.js";

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

export default function HomeChores() {
  // const [{ chores, isLoading, isError }, choresDispatch] = useReducer(
  //   choresReducer,
  //   defaultData
  // );

  const [state, choresDispatch] = useReducer(choresReducer, defaultData);

  useEffect(() => {
    console.log("calling get all chores from home");
    console.log(state);
    // choresDispatch({ type: "ALL", payload: defaultData.chores });
    // console.log(state.chores);
  }, [state]);

  const choreItems = state.chores.map(chore => (
    <div key={`holder${chore._id}`}>
      <HomeChoreItem
        item={chore}
        toggleChore={() =>
          choresDispatch({
            type: "TOGGLE",
            id: chore._id,
            complete: !chore.complete
          })
        }
      />
    </div>
  ));

  return (
    <div className="card">
      <HomeFragment
        isLoading={state.isLoading}
        isError={state.isError}
        noData={state.chores == "undefined" || state.chores.length < 1}
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
