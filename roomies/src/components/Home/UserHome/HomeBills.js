import React from "react";
import "../../GenericComponents/general.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import HomeFragment from "./HomeFragment";
import { Link } from "react-router-dom";
import HomeBillItem from "../../Bills/HomeBillItem";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

export default function HomeBills() {
  const [{ data, isLoading, isError }] = useGetRoomiesData(USER_SERVICE_URL, {
    bills: [
      {
        type: "Hydro",
        total: "120",
        payed: "20",
        dueDate: new Date(2020, 1, 30)
      },
      {
        type: "Gas",
        total: "45",
        payed: "",
        dueDate: new Date(2020, 3, 15)
      },
      {
        type: "Internet",
        total: "65",
        payed: "10",
        dueDate: new Date(2020, 3, 15)
      },
      {
        type: "Grocerys",
        total: "230",
        payed: "80",
        dueDate: new Date(2020, 5, 2)
      }
    ]
  });

  const bills = data.bills.map((bill, i) => (
    <div key={`holder${i}`}>
      <HomeBillItem item={bill} />
    </div>
  ));

  return (
    // <div className="card">
    //   <h3>Bills pending/ latest bills</h3>
    //   <p>No current bills to display</p>
    //   <p>Link to bills...</p>
    // </div>
    <div className="card">
      <HomeFragment
        isLoading={isLoading}
        isError={isError}
        noData={data.bills === "undefined" || data.bills.length < 1}
        title={"Bills pending/ latest bills"}
        itemsName={"bills"}
      >
        {bills}
      </HomeFragment>

      <Link className="secondary-link underline nav-link" to="/Chores">
        Bills >>
      </Link>
    </div>
  );
}
