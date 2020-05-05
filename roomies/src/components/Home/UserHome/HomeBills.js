import React, { useContext } from "react";
import "./homeLists.scss";
import HomeFragment from "./HomeFragment";
import HomeBillItem from "../../Bills/HomeBillItem";
import { BillsContext } from "../../Bills/BillsContext";

const tempData = {
  bills: [
    {
      type: "Hydro",
      refNum: "9435897",
      total: "120",
      payed: "20",
      dueDate: new Date(2020, 1, 30),
    },
    {
      type: "Gas",
      refNum: "0076435345",
      total: "45",
      payed: "",
      dueDate: new Date(2020, 3, 15),
    },
    {
      type: "Internet",
      refNum: "7632432",
      total: "65",
      payed: "10",
      dueDate: new Date(2020, 3, 15),
    },
    {
      type: "Grocerys",
      refNum: "",
      total: "230",
      payed: "230",
      dueDate: new Date(2020, 5, 2),
    },
  ],
};

export default function HomeBills() {
  const { bills, requestStatus } = useContext(BillsContext);
  // const [{ data, isLoading, isError }] = useGetRoomiesData();
  // USER_SERVICE_URL,
  // {}

  const billItems = bills
    ? bills.map((bill, i) => <HomeBillItem key={`bill${i}`} item={bill} />)
    : "";

  return (
    <div className="homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={requestStatus ? false : requestStatus.isLoading}
          isError={requestStatus ? false : requestStatus.isError}
          noData={bills === undefined || bills.length < 1}
          title={"Latest bills"}
          itemsName={"bills"}
          linkTitle={"All bills"}
          linkPath={"Bills"}
        >
          {billItems}
        </HomeFragment>
      </div>
    </div>
  );
}
