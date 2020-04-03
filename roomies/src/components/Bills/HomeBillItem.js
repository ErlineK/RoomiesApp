import React from "react";
import { GiPayMoney } from "react-icons/gi";
import "../Home/UserHome/homeLists.scss";
import { formatDate, formatCurrency } from "../GenericComponents/formatHelper";

// TODO: change bill background according to due date
// TODO: set Icon by bill type
// TODO: on bill click go to bill page

function HomeBillItem({ item }) {
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
