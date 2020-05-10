import React from "react";
import { FaCheck } from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
import { formatDate } from "../../utils/formatHelper";
import { getIcon } from "../../utils/iconManager";

/**
 * types of notifications:
 * general
 * bill paid
 * welcome new tenant
 */

function NofiticationMsgItem({ item }) {
  let messageTxt = "";
  switch (item.ntf_type) {
    case "bill":
      messageTxt = `${item.ntf_bill.bill_type} bill has been paid`;
      break;

    case "welcome":
      messageTxt = `Welcome ${item.from_user ? item.from_user.name : ""} to ${
        item.ntf_house ? item.ntf_house.houseName : ""
      }!`;
      break;

    default:
      messageTxt = "general message";
      break;
  }

  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("notificationMsg", "listIcon")}
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            <p>{messageTxt}</p>
            <p className="description textLight">
              {formatDate(item.added_date)}
            </p>
          </div>
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default NofiticationMsgItem;
