import React, { memo } from "react";
import "../../GenericComponents/general.scss";
import { Link } from "react-router-dom";
import HomeFragment from "./HomeFragment";
import HomeChoreItem from "../../Chores/HomeChoreItem";
import useChoresState from "../../../hooks/useChoresState";

const defaultData = {
  chores: [
    {
      _id: 1,
      leader: "Tenant 1",
      task: "Do dishes",
      dueDate: new Date(2020, 3, 9),
      complete: false
    },
    {
      _id: 3,
      leader: "Tenant 1",
      task: "Save the world",
      dueDate: new Date(2020, 3, 10),
      complete: false
    },

    {
      _id: 4,
      leader: "Tenant 1",
      task: "Sweep floor",
      dueDate: new Date(2020, 3, 25),
      complete: false
    },
    {
      _id: 2,
      leader: "Tenant 1",
      task: "Get toilet paper",
      dueDate: new Date(2020, 4, 16),
      complete: true
    }
  ]
};

// TODO: get USER'S last 5 chores by due date

function HomeChores() {
  const [chores, choresActions, requestStatus] = useChoresState(defaultData);

  const choreItems =
    chores !== undefined
      ? chores.map(chore => (
          <div key={`holder${chore._id}`}>
            <HomeChoreItem
              item={chore}
              toggleChore={choresActions.toggleChore}
            />
          </div>
        ))
      : "";

  return (
    <div className="homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={requestStatus.isLoading}
          isError={requestStatus.isError}
          noData={chores === undefined || chores.length < 1}
          title={"Your Chores"}
          itemsName={"chores"}
          linkTitle={"All chores"}
          linkPath={"Chores"}
        >
          <div className="listContainer">{choreItems}</div>
        </HomeFragment>
      </div>
    </div>
  );
}

export default memo(HomeChores);
