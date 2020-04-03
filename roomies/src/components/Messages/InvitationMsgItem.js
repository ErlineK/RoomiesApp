import React from "react";
import { FaCheck } from "react-icons/fa";
import { GiKeyring } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { formatDate } from "../GenericComponents/formatHelper";

function InvitationMsgItem({ item }) {
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
            {/* <button className="btn msgSimpleBtn highlightGreen invitationBtnPosition">
              <FaCheck className="accent-icon" />
              Accept
            </button> */}
            {item.accepted ? (
              <p>Accepted!</p>
            ) : (
              <button className="btn btn-grad-green btnAction">
                <FaCheck className="accent-icon" />
                Accept
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="msgBtn msgBtnCancel">
        <TiDeleteOutline className="msgBtnIcon" />
      </div>

      <hr></hr>
    </div>
  );
}

export default InvitationMsgItem;
