import React from "react";
import { TiMessages } from "react-icons/ti";
import { MdReplyAll } from "react-icons/md";

// import "../GenericComponents/generic_list.scss";
// import "../GenericComponents/general.scss";

// TODO: on reply button click -> open quick reply module

function GeneralMsgItem({ item }) {
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
    <div className="listItemHolder">
      <div className="listFlexHolder">
        <TiMessages className="listIcon" />
        <div style={{ width: "100%" }}>
          <div className="msgRow lhShort">
            <p className="description">
              <span style={{ fontWeight: "bold" }}>{item.author}</span> sais:
            </p>
            <p className="description textLight">{formatDate(item.date)}</p>
          </div>
          <p className="lhShort">{item.msg}</p>
        </div>
      </div>
      <div className="msgBtn msgBtnBack">
        <MdReplyAll className="msgBtnIcon" />
      </div>
      <hr></hr>
    </div>
  );
}

export default GeneralMsgItem;
