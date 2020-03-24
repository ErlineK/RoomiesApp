import React, { useState } from "react";
import "../../GenericComponents/general.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import BalanceChart from "../../GenericComponents/BalanceChart";
import CircleLoader from "../../GenericComponents/Loader/CircleLoader";
import { Link } from "react-router-dom";

const USER_STATUS_URL = "https://jsonplaceholder.typicode.com/users";
// const USER_STATUS_URL = "users/user_status"; //GET

// TODO: create balance/bills page

export default function HomeStatus() {
  const defaultData = {
    userBalance: 150,
    roomiesBalance: [
      { roomieName: "Room 1", balance: -50 },
      { roomieName: "Room 2", balance: 10 },
      { roomieName: "Room 4", balance: -60 }
    ]
  };

  const [{ data, isLoading, isError }] = useGetRoomiesData(
    USER_STATUS_URL,
    "get",
    null,
    defaultData
  );

  return (
    <div className="card" style={{ width: "100%" }}>
      <h3>House balance</h3>
      {isLoading && <CircleLoader />}
      {data.userBalance == undefined || isError ? (
        <p>No current chores to display</p>
      ) : (
        <>
          <p
            className={` ${
              data.userBalance > 0 ? "positivVal" : "negativeVal"
            }`}
          >
            {data.userBalance > 0 ? `Tenants owe you ` : `You owe `}
            {`$${Math.abs(data.userBalance)}`}
          </p>

          <BalanceChart data={data} style={{ marginTop: "-20px" }} />
        </>
      )}
      {data.size < 1 && <p>No current status to display</p>}
      <div className="navLink-holder">
        <Link
          className="secondary-link underline nav-link toRight"
          to="/Balance"
        >
          Break even >>
        </Link>
      </div>
    </div>
  );
}
