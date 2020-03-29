import React from "react";
import "./profile.scss";

import { getIcon } from "../GenericComponents/iconManager";

// TODO: get icon by  icon type

export default function UserDataItem({ editMode, item }) {
  return (
    <div className="userDataItem">
      {editMode ? (
        ""
      ) : (
        <div className="flex-container">
          {getIcon(item.icon, "item userDataIcon")}
          <p className="item itemTitle">{item.title}:</p>
          <p className=" item itemData">{item.data}</p>
        </div>
      )}
    </div>
  );
}
