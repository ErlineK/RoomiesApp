import React, { useContext } from "react";
import "./bills.scss";
import BillItem from "./BillItem";
import { getIcon } from "../../utils/iconManager";
import { BillsContext } from "./BillsContext";
import AddBillPop from "./AddBillPop";
import { BILL_TYPES } from "../../utils/AppParams";
import useInputState from "../../hooks/useInputState";

// const data = {
//   bills: [
//     {
//       _id: "111",
//       type: "Hydro",
//       refNum: "9435897",
//       total: "120",
//       payed: "20",
//       start_date: new Date(2020, 10, 24),
//       end_date: new Date(2019, 11, 30),
//       dueDate: new Date(2020, 1, 30),
//       comments: [
//         {
//           _id: "c111",
//           author: "Tenant 1",
//           msg: "Holiday times",
//           publish_date: new Date(2020, 1, 22)
//         },
//         {
//           _id: "c222",
//           author: "Tenant 1",
//           msg: "Awesome sause",
//           publish_date: new Date(2020, 1, 23)
//         }
//       ]
//     }
//   ]
// };

export default function Bills() {
  const { bills, showAddBill, toggleAddBill } = useContext(BillsContext);
  const [billType, handleBillTypeChange] = useInputState("select", "BILL_TYPE");

  const billTypeOptions = BILL_TYPES.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  // TODO: filter bills by bill type
  const filteredBills = BILL_TYPES.includes(billType)
    ? bills.filter((bill) => bill.bill_type === billType)
    : bills;

  const billItems = filteredBills
    ? filteredBills.map((bill, i) => <BillItem key={`bill${i}`} item={bill} />)
    : "";

  return (
    <div className="card user-main">
      {/* <div className="card"> */}
      <h3>Bills and Payments</h3>

      <div>Filter bills icon..</div>
      <div className="billsHolder flex-container flex-between flex-center-vertical">
        <select
          className="form-control filterSelect"
          id="billType"
          onChange={handleBillTypeChange}
          value={billType}
        >
          <option value="select" disabled>
            Filter Bill Type...
          </option>
          <option value="all">All</option>
          {billTypeOptions}
        </select>

        {getIcon("addFile", "ic ic_lg ic_roomies", () => toggleAddBill())}
      </div>
      <div className="billsHolder listContainer">{billItems}</div>
      {showAddBill && <AddBillPop />}
    </div>
  );
}
