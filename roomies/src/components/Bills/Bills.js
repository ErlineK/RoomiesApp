import React, { useContext } from "react";
import "./bills.scss";
import BillItem from "./BillItem";
import { getIcon } from "../../utils/iconManager";
import { BillsContext } from "./BillsContext";
import AddBillPop from "./AddBillPop";

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

  const billItems = bills
    ? bills.map((bill, i) => <BillItem key={`bill${i}`} item={bill} />)
    : "";

  return (
    <div className="card user-main">
      {/* <div className="card"> */}
      <h3>Bills and Payments</h3>
      {getIcon("addFile", "sectionIcon ic ic_lg ic_fade", () =>
        toggleAddBill()
      )}
      <div>Filter bills..</div>
      <div className="billsHolder listContainer">{billItems}</div>
      {showAddBill && <AddBillPop />}
    </div>
  );
}
