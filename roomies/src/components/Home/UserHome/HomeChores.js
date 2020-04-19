import React, { memo } from "react";
import "../../GenericComponents/general.scss";
import HomeFragment from "./HomeFragment";
import HomeChoreItem from "../../Chores/HomeChoreItem";
import useChoresState from "../../../hooks/useChoresState";

// TODO: get USER'S last 5 chores by due date

function HomeChores() {
  const [chores, choresActions, requestStatus] = useChoresState({}, "HOME");

  console.log("chores: ");
  console.log(chores);

  const choreItems =
    chores !== undefined && Object.entries(chores).length > 0
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
          noData={chores === undefined || Object.entries(chores).length < 1}
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
