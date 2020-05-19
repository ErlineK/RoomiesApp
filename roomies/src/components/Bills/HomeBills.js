import React, { useContext } from "react";
// import "./homeLists.scss";
import HomeFragment from "../Home/UserHome/HomeFragment";
import BillItem from "./BillItem";
import { BillsContext } from "./utils/BillsContext";

export default function HomeBills() {
  const { bills, requestStatus } = useContext(BillsContext);

  console.log("Home bills is called");

  const billItems = bills
    ? bills
        // .slice(0, 5)
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
