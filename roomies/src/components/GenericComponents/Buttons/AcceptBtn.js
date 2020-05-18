import React from "react";
import { getIcon } from "../../../utils/iconManager";

export default function AcceptBtn({ onClick }) {
  return (
    <button
      className="btn btn-grad-green btnAction"
      onClick={(e) => onClick(e)}
    >
      {getIcon("accept", "accent-icon")}
      Accept
    </button>
  );
}
