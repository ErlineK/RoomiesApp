import React, { useContext } from "react";
import "./bills.scss";
import BillItem from "./BillItem";
import { getIcon } from "../../utils/iconManager";
import { BillsContext } from "./BillsContext";
import AddBillPop from "./AddBillPop";

// TODO: get bills for user

const data = {
  bills: [
    {
      _id: "111",
      type: "Hydro",
      refNum: "9435897",
      total: "120",
      payed: "20",
      start_date: new Date(2020, 10, 24),
      end_date: new Date(2019, 11, 30),
      dueDate: new Date(2020, 1, 30),
      comments: [
        {
          _id: "c111",
          author: "Tenant 1",
          msg: "Holiday times",
          publish_date: new Date(2020, 1, 22)
        },
        {
          _id: "c222",
          author: "Tenant 1",
          msg: "Awesome sause",
          publish_date: new Date(2020, 1, 23)
        }
      ]
    },
    {
      _id: "112",
      type: "Gas",
      refNum: "0076435345",
      total: "45",
      payed: "",
      dueDate: new Date(2020, 3, 15)
    },
    {
      _id: "113",
      type: "Internet",
      refNum: "7632432",
      total: "65",
      payed: "10",
      dueDate: new Date(2020, 3, 15)
    },
    {
      _id: "114",
      type: "Grocerys",
      refNum: "",
      total: "230",
      payed: "230",
      dueDate: new Date(2020, 5, 2)
    }
  ]
};

export default function Bills() {
  const { bills, showAddBill, toggleAddBill } = useContext(BillsContext);

  const billItems = data.bills.map((bill, i) => (
    <BillItem key={`bill${i}`} item={bill} />
  ));

  return (
    <div className="card user-main">
      {/* <div className="card"> */}
      <h3>Bills and Payments</h3>
      {getIcon("addFile", "sectionIcon", () => {
        console.log("toggling bill");
        toggleAddBill();
      })}
      Filter bills..
      <div className="billsHolder listContainer">{billItems}</div>
      {showAddBill && <AddBillPop />}
    </div>
  );
}
