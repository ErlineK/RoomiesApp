import React from "react";
import "../Home/UserHome/homeLists.scss";
import { formatDateOnly } from "../GenericComponents/formatHelper";

// TODO: on tesk complete - change glow to complete with animation + send to DB

function HomeChoreItem({ item, toggleChore }) {
  return (
    <div className="listItemHolder" onClick={() => toggleChore(item._id)}>
      <div className="listFlexHolder">
        <div
          className={`glowIndicator listIcon ${
            item.complete ? "indicatorActive" : ""
          } `}
        ></div>
        <div style={{ width: "100%" }}>
          <div className="msgRow lhShort">
            <p className={item.complete ? "completeItemText" : ""}>
              {item.task}
            </p>
            <p className="description textLight">{formatDateOnly(item.date)}</p>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default HomeChoreItem;
