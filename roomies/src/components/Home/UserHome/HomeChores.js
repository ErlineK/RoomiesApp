import React from "react";
import "../../GenericComponents/general.scss";
import { Link } from "react-router-dom";
// import "../../Nav/navbar.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import HomeFragment from "./HomeFragment";
import HomeChoreItem from "../../Chores/HomeChoreItem";
import useChoresState from "../../../hooks/useChoresState";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

// TODO: create chore item
// TODO: get USER'S last 5 chores by due date

export default function HomeChores() {
  const [{ data, isLoading, isError }] = useGetRoomiesData(USER_SERVICE_URL, {
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
        complete: false
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
  });

  const [chores, toggleChore] = useChoresState(data.chores);

  //   const [{ data, isLoading, isError }, doFetch] = useGetRoomiesData(
  //     USER_SERVICE_URL,
  //     {
  //       chores: []
  //     }
  //   );

  //   doFetch();

  const choreItems = chores.map(chore => (
    <div key={`holder${chore._id}`}>
      <HomeChoreItem item={chore} toggleChore={toggleChore} />
    </div>
  ));

  return (
    <div className="card">
      <HomeFragment
        isLoading={isLoading}
        isError={isError}
        noData={chores == "undefined" || chores.length < 1}
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
