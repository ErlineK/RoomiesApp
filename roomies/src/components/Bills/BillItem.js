import React from "react";
import "../Home/UserHome/homeLists.scss";
import {
  formatCurrency,
  formatDateOnly,
  formatDayMonth,
} from "../../utils/formatHelper";
import { getBackgroundByDue } from "../Home/UserHome/homeHelper";
import { getIcon } from "../../utils/iconManager";
import { getIconByBillType } from "./billsHelper";
import { Link } from "react-router-dom";
// import CommentSection from "../GenericComponents/Comment/CommentSection";

// TODO: on bill click go to bill page

function BillItem({ item }) {
  const handleRemoveBill = (e) => {
    e.preventDefault();

    // TODO: prompt confiramtion
    // TODO: on accept confirm - remove bill

    console.log("removing bill");
  };

  const handleEditBill = (e) => {
    e.preventDefault();

    // TODO: go to edit bill with bill info

    console.log("editing bill");
  };

  const billingPreiod =
    item && item.start_date && item.end_date
      ? `${formatDayMonth(item.start_date)} - ${formatDayMonth(item.end_date)}`
      : "";

  return (
    <div
      className={`${getBackgroundByDue(item.due_date)} listItemHolder billItem`}
    >
      <div className="listFlexHolder">
        {getIconByBillType(
          item.bill_type,
          `${item.total_amount === item.payed ? "success" : ""} listIcon`
        )}
        {/* <div
          className="billsGrid"
          onClick={() => {
            console.log("clicked on bill");
          }}
        > */}
        <Link
          className="billsGrid"
          to={{ pathname: "/ViewBill", state: { billId: item._id } }}
        >
          <div className="gridItem lg-sc-only">
            <p>{item.invoice_num}</p>
          </div>

          <div className="gridItem">
            <p>{billingPreiod}</p>
          </div>

          <div className="gridItem">
            <p>{item.bill_type}</p>
          </div>

          <div className="gridItem">
            <p
              className={`${
                Math.abs(item.payed) >= Math.abs(item.total_amount)
                  ? "success"
                  : ""
              }`}
            >
              {item.payed && item.payed !== item.total_amount
                ? `${formatCurrency(item.total_amount - item.payed)}/`
                : ""}
              {formatCurrency(item.total_amount)}
            </p>
          </div>
          <div className="gridItem">
            <p className="description textLight">
              {formatDateOnly(item.due_date)}
            </p>
          </div>
        </Link>
        <div className="flex-container billsIconsHolder">
          {getIcon("edit", "billActionIcon ic ic_md ic_roomies", (e) =>
            handleEditBill(e)
          )}
          {getIcon("delete", "billActionIcon ic_lg ic_alert", (e) =>
            handleRemoveBill(e)
          )}
        </div>
      </div>
      {/* <CommentSection comments={item.comments} type={"PREV"} /> */}

      <hr></hr>
    </div>
  );
}

export default BillItem;
