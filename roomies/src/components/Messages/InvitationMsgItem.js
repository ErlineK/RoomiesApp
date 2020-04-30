import React from "react";
import { FaCheck } from "react-icons/fa";
import { GiKeyring } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { formatDateOnly } from "../../utils/formatHelper";
import { getIcon } from "../../utils/iconManager";

function InvitationMsgItem({ item }) {
  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        <GiKeyring className="listIcon" />
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            <p className="msgTitle">
              <span style={{ fontWeight: "bold" }}>{item.from_user.name}</span>{" "}
              invited you to join{" "}
              <span style={{ fontWeight: "bold" }}>
                {item.ntf_house.houseName}
              </span>
            </p>
            <p className="description textLight">{formatDateOnly(item.date)}</p>
          </div>
          <div className="msgRow">
            <p className="description">
              {item.ntf_house.address} , {item.ntf_house.city}
            </p>
            {/* <button className="btn msgSimpleBtn highlightGreen invitationBtnPosition">
              <FaCheck className="accent-icon" />
              Accept
            </button> */}
            {item.accepted ? (
              <p className="success">Accepted!</p>
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
        {getIcon("delete", "msgBtnIcon")}
        {/* <TiDeleteOutline className="msgBtnIcon" /> */}
      </div>

      <hr></hr>
    </div>
  );
}

export default InvitationMsgItem;
