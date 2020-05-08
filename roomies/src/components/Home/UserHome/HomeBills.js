import React, { useContext } from "react";
import "./homeLists.scss";
import HomeFragment from "./HomeFragment";
import BillItem from "../../Bills/BillItem";
import { BillsContext } from "../../Bills/BillsContext";

const tempData = {
  bills: [
    {
      type: "Hydro",
      refNum: "9435897",
      total: "120",
      paid: "20",
      dueDate: new Date(2020, 1, 30),
    },
    {
      type: "Gas",
      refNum: "0076435345",
      total: "45",
      paid: "",
      dueDate: new Date(2020, 3, 15),
    },
    {
      type: "Internet",
      refNum: "7632432",
      total: "65",
      paid: "10",
      dueDate: new Date(2020, 3, 15),
    },
    {
      type: "Grocerys",
      refNum: "",
      total: "230",
      paid: "230",
      dueDate: new Date(2020, 5, 2),
    },
  ],
};

export default function HomeBills() {
  const { bills, requestStatus } = useContext(BillsContext);

  const billItems = bills
    ? bills
        .slice(0, 5)
        .map((bill, i) => (
          <BillItem key={`bill${i}`} item={bill} type={"HOME"} />
        ))
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
