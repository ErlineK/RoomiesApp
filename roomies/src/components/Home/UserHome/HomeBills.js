import React from "react";
import "../../GenericComponents/general.scss";
import "./homeLists.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import HomeFragment from "./HomeFragment";
import HomeBillItem from "../../Bills/HomeBillItem";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

export default function HomeBills() {
  const [{ data, isLoading, isError }] = useGetRoomiesData(USER_SERVICE_URL, {
    bills: [
      {
        type: "Hydro",
        refNum: "9435897",
        total: "120",
        payed: "20",
        dueDate: new Date(2020, 1, 30)
      },
      {
        type: "Gas",
        refNum: "0076435345",
        total: "45",
        payed: "",
        dueDate: new Date(2020, 3, 15)
      },
      {
        type: "Internet",
        refNum: "7632432",
        total: "65",
        payed: "10",
        dueDate: new Date(2020, 3, 15)
      },
      {
        type: "Grocerys",
        refNum: "",
        total: "230",
        payed: "230",
        dueDate: new Date(2020, 5, 2)
      }
    ]
  });

  const bills = data.bills.map((bill, i) => (
    <HomeBillItem key={`bill${i}`} item={bill} />
  ));

  return (
    <div className="homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={isLoading}
          isError={isError}
          noData={data.bills === "undefined" || data.bills.length < 1}
          title={"Bills pending/ latest bills"}
          itemsName={"bills"}
          linkTitle={"All bills"}
          linkPath={"Bills"}
        >
          {bills}
        </HomeFragment>
      </div>
    </div>
  );
}
