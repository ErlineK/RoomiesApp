import React from "react";

function GeneralMsgItem({ item }) {
  return (
    <div className="listItemHolder">
      <p>{item.author} wrote:</p>
      <p>{item.msg}</p>
      <hr></hr>
    </div>
  );
}

export default GeneralMsgItem;
