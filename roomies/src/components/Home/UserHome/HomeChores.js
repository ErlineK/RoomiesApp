import React, { useState, useEffect } from "react";
import "../../GenericComponents/general.scss";
import CircleLoader from "../../GenericComponents/Loader/CircleLoader";
import { Link } from "react-router-dom";
import "../../Nav/navbar.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

export default function HomeChores() {
  const [{ data, isLoading, isError }] = useGetRoomiesData(USER_SERVICE_URL, {
    chores: ["Do dishes", "Walk dog"]
  });
  //   const [data, setData] = useState({ users: [], isFetching: false });
  //   const [{ data, isLoading, isError }, doFetch] = useGetRoomiesData(
  //     USER_SERVICE_URL,
  //     {
  //       chores: []
  //     }
  //   );

  //   doFetch();

  return (
    <div className="card">
      {isLoading && <CircleLoader />}
      {data.chores == undefined || isError || data.chores.length < 1 ? (
        <p>No current chores to display</p>
      ) : (
        // <p>Do your chores!!</p>
        <p>{data.chores}</p>
      )}
      <div className="navLink-holder" style={{ display: "-webkit-box" }}>
        <Link className="secondary-link underline nav-link" to="/Chores">
          Other chores >>
        </Link>
      </div>
    </div>
  );
}
