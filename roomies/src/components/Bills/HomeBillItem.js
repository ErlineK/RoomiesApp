import React, { useContext } from "react";
import { GiPayMoney } from "react-icons/gi";
import { MdReplyAll } from "react-icons/md";
import "../Home/UserHome/homeLists.scss";

// TODO: change bill background according to due date
// TODO: set Icon by bill type
// TODO: on bill click go to bill page

function HomeBillItem({ item }) {
  function formatDate(dateBase) {
    return new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).format(dateBase);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currencyDisplay: "symbol",
      currency: "CAD"
    }).format(amount);
  }
  return (
    <div
      className="listItemHolder"
      onClick={() => {
        console.log("clicked on bill");
      }}
    >
      <div className="listFlexHolder">
        <GiPayMoney className="listIcon" />
        <div style={{ width: "100%" }}>
          <div className="msgRow lhShort listGridHolder">
            <div className="gridItem">
              <p>{item.type}</p>
            </div>
            <div className="gridItem">
              <p>
                {item.payed
                  ? `${formatCurrency(item.total - item.payed)}/`
                  : ""}
                {formatCurrency(item.total)}
              </p>
            </div>
            <p className="description textLight gridItem">
              {formatDate(item.dueDate)}
            </p>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default HomeBillItem;
