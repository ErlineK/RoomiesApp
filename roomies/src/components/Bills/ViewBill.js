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
import PaymentItem from "./Payments/PaymentItem";
import { useHistory, Redirect } from "react-router-dom";

// TODO: add comments area + add comment
// TODO: create payments area: payments list

export default function ViewBill(props) {
  const history = useHistory();
  const {
    showAddPayment,
    toggleAddPayment,
    getBillById,
    editBill,
    removeBill,
  } = useContext(BillsContext);

  const billId = props.location.state.billId;
  console.log("entered view bill. bill id:" + billId);
  const bill = getBillById(billId);

  const billPeriod =
    bill && bill.start_date !== "" && bill.end_date !== ""
      ? `${formatDayMonth(bill.start_date)} - ${formatDayMonth(bill.end_date)}`
      : "";

  const billTitle = bill ? `${bill.bill_type} ${billPeriod}` : "";

  const handleAddDoc = (e) => {
    e.preventDefault();

    console.log("clicked add document");
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    console.log("clicked add comment");
  };

  const paymentItems =
    bill && bill.payments && bill.payments.length > 0
      ? bill.payments.map((payment) => (
          <PaymentItem key={payment._id} item={payment} />
        ))
      : "No payments made yet. Click + button to tart paying NOW >>";

  return (
    <>
      {bill === undefined ? (
        <Redirect to="/" />
      ) : (
        <div className="card user-main">
          <div
            className="secondary-link toLeft btnBack"
            onClick={() => history.goBack()}
          >
            {getIcon("btnBack", "back-icon")} back
          </div>
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
              <div className="titleContainer ">
                Payments
                {bill.payed < bill.total_amount &&
                  getIcon("add", "ic ic_lg ic_light", (e) =>
                    toggleAddPayment(e)
                  )}
              </div>
              {bill.total_amount <= bill.payed && (
                <PaymentItem action={"complete"} />
              )}
              {paymentItems}
            </div>

            <div id="comments Holder">
              <div className="titleContainer">
                Comments
                {getIcon("add", "ic ic_lg ic_light", (e) =>
                  handleAddComment(e)
                )}
              </div>
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
      )}
    </>
  );
}
