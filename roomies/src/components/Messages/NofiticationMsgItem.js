import React from "react";
import { FaCheck } from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
// import { AiOutlineNotification } from "react-icons/ai";
// import { GiAcousticMegaphone, GiPin } from "react-icons/gi";
import { msgFormatDate } from "./messagesHelper";

/**
 * types of notifications:
 * general
 * bill
 * transfer -> requires confirmation
 */

function NofiticationMsgItem({ item }) {
  const TRNSFR = "transfer"; // notification of type 'transfer'
  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        <GoMegaphone className="listIcon" />
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            <p>{item.msg}</p>
            <p className="description textLight">{msgFormatDate(item.date)}</p>
          </div>
          {item.ntfType == TRNSFR && (
            <div className="msgRow" style={{ marginBottom: "0.5rem" }}>
              <p className="description"></p>

              {/* <button className="btn msgSimpleBtn highlightGreen invitationBtnPosition">
                <FaCheck className="accent-icon" />
                Confirm
              </button> */}
              <button className="btn btn-grad-green btnAction invitationBtnPosition">
                <FaCheck className="accent-icon" />
                Accept
              </button>
            </div>
          )}
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default NofiticationMsgItem;
