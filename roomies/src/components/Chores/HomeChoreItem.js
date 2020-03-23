import React from "react";
import { TiMessages } from "react-icons/ti";
import { MdReplyAll } from "react-icons/md";
import "../Home/UserHome/homeLists.scss";

// TODO: on tesk complete - change glow to complete with animation + send to DB

function HomeChoreItem({ item, toggleChore }) {
  function formatDate(dateBase) {
    return new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).format(dateBase);
  }
  return (
    <div className="listItemHolder" onClick={() => toggleChore(item._id)}>
      <div className="listFlexHolder">
        <div className="glowIndicator listIcon"></div>
        <div style={{ width: "100%" }}>
          <div className="msgRow lhShort">
            <p className="">{item.task}</p>
            <p className="description textLight">{formatDate(item.date)}</p>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default HomeChoreItem;
