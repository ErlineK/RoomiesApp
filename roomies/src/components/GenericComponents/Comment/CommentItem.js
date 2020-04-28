import React from "react";
import { formatDateOnly } from "../../../utils/formatHelper";
import "./comment.scss";

function CommentItem({ item }) {
  console.log("comment item: ");
  console.log(item);
  return (
    <div className="commentHolder">
      <div className="msgRow lhShort">
        <p className="description textLight">
          {formatDateOnly(item.publish_date)}
        </p>
        <p className="description">
          <span style={{ fontWeight: "bold" }}>{item.author}</span>:{item.msg}
        </p>
      </div>
      <hr></hr>
    </div>
  );
}

export default CommentItem;
