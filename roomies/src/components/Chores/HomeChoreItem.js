import React, { useContext } from "react";
import { TiMessages } from "react-icons/ti";
import { MdReplyAll } from "react-icons/md";
import "../Home/UserHome/homeLists.scss";
import { ChoresContext } from "./ChoresContext";

// TODO: on tesk complete - change glow to complete with animation + send to DB

function HomeChoreItem({ item }) {
  const { choresDispatch } = useContext(ChoresContext);

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
    <div
      className="listItemHolder"
      onClick={() =>
        choresDispatch({
          type: "TOGGLE",
          id: item._id,
          complete: !item.complete
        })
      }
    >
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
            <p className="description textLight">{formatDate(item.date)}</p>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default HomeChoreItem;
