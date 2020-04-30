import React from "react";
import { GiPayMoney } from "react-icons/gi";
import "../Home/UserHome/homeLists.scss";
import {
  formatCurrency,
  formatDateOnly,
  formatDayMonth
} from "../../utils/formatHelper";
import { getBackgroundByDue } from "../Home/UserHome/homeHelper";
import { getIcon } from "../../utils/iconManager";
// import CommentSection from "../GenericComponents/Comment/CommentSection";

// TODO: set Icon by bill type
// TODO: on bill click go to bill page

function BillItem({ item }) {
  const handleRemoveBill = e => {
    e.preventDefault();

    // TODO: prompt confiramtion
    // TODO: on accept confirm - remove bill

    console.log("removing bill");
  };

  const handleEditBill = e => {
    e.preventDefault();

    // TODO: go to edit bill with bill info

    console.log("editing bill");
  };

  const billingPreiod =
    item && item.start_date && item.end_date
      ? `${formatDayMonth(item.start_date)} - ${formatDayMonth(
          item.start_date
        )}`
      : "";

  return (
    <div
      className={`${getBackgroundByDue(item.dueDate)} listItemHolder billItem`}
    >
      <div className="listFlexHolder">
        <GiPayMoney
          className={`${item.total === item.payed ? "success" : ""} listIcon`}
        />

        <div
          className="billsGrid"
          onClick={() => {
            console.log("clicked on bill");
          }}
        >
          <div className="gridItem lg-sc-only">
            <p>{item.refNum}</p>
          </div>

          <div className="gridItem">
            <p>{billingPreiod}</p>
          </div>

          <div className="gridItem">
            <p>{item.type}</p>
          </div>

          <div className="gridItem">
            <p
              className={`${
                Math.abs(item.payed) >= Math.abs(item.total) ? "success" : ""
              }`}
            >
              {item.payed && item.payed !== item.total
                ? `${formatCurrency(item.total - item.payed)}/`
                : ""}
              {formatCurrency(item.total)}
            </p>
          </div>
          <div className="gridItem">
            <p className="description textLight">
              {formatDateOnly(item.dueDate)}
            </p>
          </div>
        </div>
        <div className="flex-container billsIconsHolder">
          {getIcon("edit", "billActionIcon success_hov", e =>
            handleEditBill(e)
          )}
          {getIcon("delete", "billActionIcon success_hov", e =>
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
