import React from "react";
import { getIconByBillType } from "./billsHelper";
import "../Home/UserHome/homeLists.scss";
import {
  formatDateOnly,
  formatDayMonth,
  formatCurrency,
} from "../../utils/formatHelper";
import { getBackgroundByDue } from "../Home/UserHome/homeHelper";

// TODO: set Icon by bill type
// TODO: on bill click go to bill page

function HomeBillItem({ item }) {
  const billingPreiod =
    item && item.start_date && item.end_date
      ? `${formatDayMonth(item.start_date)} - ${formatDayMonth(item.end_date)}`
      : "";

  return (
    <div
      className={`${getBackgroundByDue(item.due_date)} listItemHolder`}
      onClick={() => {
        console.log("clicked on bill");
      }}
    >
      <div className="listFlexHolder">
        {getIconByBillType(
          item.bill_type,
          `${item.total_amount === item.payed ? "success" : ""} listIcon`
        )}

        <div
          className="msgRow lhShort listGridHolder"
          style={{ width: "100%" }}
        >
          {/* <div className="gridItem">
            <p>{item.refNum}</p>
          </div> */}
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
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default HomeBillItem;
