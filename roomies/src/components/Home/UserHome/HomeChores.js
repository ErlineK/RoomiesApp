import React from "react";
import "../../GenericComponents/general.scss";
import { Link } from "react-router-dom";
// import "../../Nav/navbar.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import HomeFragment from "./HomeFragment";
import HomeChoreItem from "../../Chores/HomeChoreItem";

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

  //   const [{ data, isLoading, isError }, doFetch] = useGetRoomiesData(
  //     USER_SERVICE_URL,
  //     {
  //       chores: []
  //     }
  //   );

  //   doFetch();

  const chores = data.chores.map(chore => (
    <div key={`holder${chore._id}`}>
      <HomeChoreItem item={chore} />
    </div>
  ));

  return (
    <div className="card">
      <HomeFragment
        isLoading={isLoading}
        isError={isError}
        noData={data.chores == "undefined" || data.chores.length < 1}
        title={"Your Chores"}
        itemsName={"chores"}
      >
        <div className="listContainer">
          {/* <div className="titleContainer">Your Chores</div> */}
          {chores}
        </div>
      </HomeFragment>

      <Link className="secondary-link underline nav-link" to="/Chores">
        Other chores >>
      </Link>
    </div>
  );
}
