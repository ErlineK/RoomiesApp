import React from "react";
import { formatDateOnly } from "../../../utils/formatHelper";
import { getIconByAction } from "../../Bills/billsHelper";
import "./comment.scss";
import { getIcon } from "../../../utils/iconManager";

function CommentItem({ item }) {
  console.log("comment item: ");
  console.log(item);
  return (
    <div className="">
      <div className="flex-container flex-between listItemLight">
        <div className="flex-container">
          <div
            className="flex-container flex-between"
            style={{ padding: "0.25rem" }}
          >
            {getIconByAction("comment", "ic ic_md ic_decore ic_margins_hr")}

            <span className="description">
              {formatDateOnly(item.publish_date)}
            </span>
          </div>

          <div>
            <p>
              <span>
                &nbsp; &nbsp;
                <span style={{ fontWeight: "bold" }}>
                  {item.author.name}
                </span>: <span className="comment">{item.msg}</span>
              </span>
            </p>
          </div>
        </div>

        {getIcon("delete", "ic ic_md ic_alert ic_margins_vr")}
        {/* <span className="ic ic_lg ic_alert">X</span> */}
      </div>

      <hr className="separator-light"></hr>
    </div>
  );
}

export default CommentItem;
