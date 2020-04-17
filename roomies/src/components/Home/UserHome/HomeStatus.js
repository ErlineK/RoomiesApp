import React from "react";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import HomeFragment from "./HomeFragment";
import { formatCurrency } from "../../../utils/formatHelper";

const USER_STATUS_URL = "https://jsonplaceholder.typicode.com/users";
// const USER_STATUS_URL = "users/user_status"; //GET

// TODO: create balance/bills page

export default function HomeStatus() {
  const defaultData = {
    userBalance: -100,
    roomiesBalance: [
      { _id: "111", roomieName: "Tenant 1", balance: -50 },
      { _id: "222", roomieName: "Tenant 2", balance: 10 },
      { _id: "333", roomieName: "Tenant 4", balance: -60 }
    ]
  };

  const [{ data, isLoading, isError }] = useGetRoomiesData(
    USER_STATUS_URL,
    defaultData
  );

  const balance = `$${Math.abs(data.userBalance)}`;
  const balanceSum = (
    <h6
      className={` ${
        data.userBalance > 0 ? "positivVal" : "negativeVal"
      } nav-link`}
    >
      {data.userBalance > 0
        ? `Tenants owe you ${balance}`
        : `You owe ${balance} total`}
    </h6>
  );

  const tenants = data.roomiesBalance.map(roomie => (
    <div key={roomie._id} className="balanceItem">
      <p className={`${roomie.balance < 0 ? "red" : ""} underline`}>
        {roomie.roomieName}
      </p>
      <p className="balance-text"> {formatCurrency(roomie.balance)}</p>
    </div>
  ));

  return (
    <div className="homeItem">
      <div className="card">
        <HomeFragment
          isLoading={isLoading}
          isError={isError}
          noData={data === undefined || data.roomiesBalance.length < 1}
          title={`Your total balance: ${formatCurrency(data.userBalance)}`}
          itemsName={"data"}
          linkTitle={"Break even"}
          linkPath={"Balance"}
        >
          <div className="listItemHolder">
            <div className="flex-container flex-around  ">{tenants}</div>
          </div>
        </HomeFragment>
      </div>
    </div>
  );
}
