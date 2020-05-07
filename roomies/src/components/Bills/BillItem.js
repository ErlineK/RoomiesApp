import React, { useContext } from "react";
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
import { BillsContext } from "./BillsContext";
// import CommentSection from "../GenericComponents/Comment/CommentSection";

/* bill item types: "HOME" */

function BillItem({ item, type }) {
  const { removeBill } = useContext(BillsContext);

  const handleRemoveBill = (e) => {
    e.preventDefault();

    // prompt for confiramtion
    window.confirm("Are you sure you want to delete this item?") &&
      removeBill(item._id);
  };

  const billingPreiod =
    item && item.start_date && item.end_date
      ? `${formatDayMonth(item.start_date)} - ${formatDayMonth(item.end_date)}`
      : "";

  const fullyPayed = item.payed && item.payed >= item.total_amount;

  return (
    <div
      className={`${
        !fullyPayed && getBackgroundByDue(item.due_date)
      } listItemHolder billItem`}
    >
      <div className="listFlexHolder">
        {getIconByBillType(
          item.bill_type,
          `${fullyPayed ? "success" : ""} listIcon`
        )}

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
              {item.payed && item.payed < item.total_amount
                ? `${formatCurrency(item.payed)}/`
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
        {type !== "HOME" && (
          <div className="flex-container billsIconsHolder">
            {/* {getIcon("edit", "billActionIcon ic ic_md ic_roomies", (e) =>
            handleEditBill(e)
          )} */}
            {getIcon("delete", "billActionIcon ic_lg ic_alert", (e) =>
              handleRemoveBill(e)
            )}
          </div>
        )}
      </div>
      {/* <CommentSection comments={item.comments} type={"PREV"} /> */}

      <hr></hr>
    </div>
  );
}

export default BillItem;
