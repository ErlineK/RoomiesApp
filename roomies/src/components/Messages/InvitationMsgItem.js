import React from "react";
import { FaAngellist, FaCheck } from "react-icons/fa";
import { MdRemoveCircle, MdRemoveCircleOutline } from "react-icons/md";
import { GiHouseKeys, GiKeyring, GiKey } from "react-icons/gi";

function InvitationMsgItem({ item }) {
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
        <GiKeyring className="listIcon" />
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            <p>
              <span style={{ fontWeight: "bold" }}>{item.author}</span> invited
              you to join{" "}
              <span style={{ fontWeight: "bold" }}>{item.propertyName}</span>
            </p>
            <p className="description textLight">{formatDate(item.date)}</p>
          </div>
          <div className="msgRow">
            <p className="description">
              {item.propertyAddress} , {item.propertyCity}
            </p>
            <button className="btn btn-grad-green btnAction">
              <FaCheck className="accent-icon" />
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* <div className="msgBtn msgBtnAccept">
          <FaAngellist className="msgBtnIcon" />
        </div> */}
      <div className="msgBtn msgBtnCancel">
        <MdRemoveCircleOutline className="msgBtnIcon" />
      </div>

      <hr></hr>
    </div>
  );
}

export default InvitationMsgItem;
