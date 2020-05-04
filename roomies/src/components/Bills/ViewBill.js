import React, { useContext } from "react";
import "./bills.scss";
import { getIcon } from "../../utils/iconManager";
import {
  formatDayMonth,
  formatDateOnly,
  formatCurrency,
} from "../../utils/formatHelper";
import { BillsContext } from "./BillsContext";
import AddPayment from "./Payments/AddPayment";
import EditableDataItem from "../GenericComponents/EditableDataItem/EditableDataItem";

// TODO: add comments area + add comment
// TODO: create payments area: payments list

export default function ViewBill(props) {
  const { showAddPayment, toggleAddPayment, editBill, removeBill } = useContext(
    BillsContext
  );

  console.log("show payment: " + showAddPayment);

  const bill = props.location.state.bill;

  const billPeriod =
    bill.start_date !== "" && bill.end_date !== ""
      ? `${formatDayMonth(bill.start_date)} - ${formatDayMonth(bill.end_date)}`
      : "no p";

  const billTitle = `${bill.bill_type} ${billPeriod}`;

  const handleAddDoc = (e) => {
    e.preventDefault();

    console.log("clicked add document");
  };

  return (
    <div className="card user-main">
      <h4 className="section-title">{billTitle}</h4>

      <div className="flex-container flex-columns-holder viewBillContainer">
        <div className="flex-container flex-fill data-section billDataSection">
          <EditableDataItem
            item={{
              dbName: "invoice_num",
              title: "Invoice Number",
              data: bill.invoice_num,
              icon: "name",
              type: "text",
            }}
            handleUpdate={editBill}
          />

          <EditableDataItem
            item={{
              title: "Billing Period",
              data: "",
              icon: "doc_period",
              type: "text",
            }}
          />

          <div className="flex-columns-holder indented">
            <EditableDataItem
              item={{
                dbName: "start_date",
                title: "From",
                data: formatDateOnly(bill.start_date),
                icon: "",
                type: "date",
              }}
              handleUpdate={editBill}
            />
            <EditableDataItem
              item={{
                dbName: "end_date",
                title: "To",
                data: formatDateOnly(bill.end_date),
                icon: "",
                type: "date",
              }}
              handleUpdate={editBill}
            />
          </div>
        </div>
        <div className="flex-container flex-fill data-section billDataSection">
          <EditableDataItem
            item={{
              dbName: "due_date",
              title: "Payment Due",
              data: formatDateOnly(bill.due_date),
              icon: "pay_due",
              type: "date",
            }}
            handleUpdate={editBill}
          />

          <EditableDataItem
            item={{
              dbName: "total_amount",
              title: "Total to pay",
              data: formatCurrency(bill.total_amount),
              icon: "inv_amount",
              type: "text",
            }}
            handleUpdate={editBill}
          />
        </div>
      </div>

      <div>
        <div id="payments Holder">
          <div className="titleContainer">
            Payments
            {getIcon("add", "ic ic_lg ic_light", (e) => toggleAddPayment(e))}
          </div>
          These are apyments
        </div>

        <div id="comments Holder">
          <div className="titleContainer">Comments</div>
          These are comments
        </div>

        <div id="comments Holder">
          <div className="titleContainer">
            Invoice &amp; Receipts
            {getIcon("add", "ic ic_lg ic_light", (e) => handleAddDoc(e))}
          </div>
          These are comments
        </div>
      </div>
      {showAddPayment && <AddPayment bill={bill} />}
    </div>
  );
}
