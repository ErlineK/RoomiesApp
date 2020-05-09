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
import CommentItem from "../GenericComponents/Comment/CommentItem";
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

  const fullyPaid = item.paid && item.paid >= item.total_amount;

  const lastComment =
    item.bill_comments && item.bill_comments.length > 0 ? (
      <p className={"comment indented"}>
        <span style={{ fontWeight: "bold" }}>
          {item.bill_comments[0].author.name}:{" "}
        </span>
        {item.bill_comments[0].msg}
      </p>
    ) : (
      ""
    );

  return (
    <div
      className={`${
        !fullyPaid && getBackgroundByDue(item.due_date)
      } listItemHolder billItem`}
    >
      <div className="listFlexHolder">
        {getIconByBillType(
          item.bill_type,
          `${fullyPaid ? "success" : ""} listIcon`
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
                Math.abs(item.paid) >= Math.abs(item.total_amount)
                  ? "success"
                  : ""
              }`}
            >
              {item.paid && item.paid < item.total_amount
                ? `${formatCurrency(item.paid)}/`
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
            {!(item.payments && item.payments.length > 0) &&
              getIcon("delete", "billActionIcon ic_lg ic_alert", (e) =>
                handleRemoveBill(e)
              )}
          </div>
        )}
      </div>
      {lastComment}
      {/* <CommentSection comments={item.comments} type={"PREV"} /> */}

      <hr></hr>
    </div>
  );
}

export default BillItem;
