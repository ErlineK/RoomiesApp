import "./comment.scss";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import useInputState from "../../../hooks/useInputState";
import { getIcon } from "../../../utils/iconManager";

// TODO: handle comment after edit bill

export default function AddComment({ billId }) {
  const [editMode, toggleEditMode] = useToggle(false);
  const [comment, handleCommentChange] = useInputState("", "COMMENT");

  const handleAddComment = (e) => {
    e.preventDefault();

    console.log("adding comment: " + comment);
    toggleEditMode();
  };

  return (
    <div className="flex-container flext-right flex-center-vertical">
      <input
        id="comment"
        type="text"
        name="comment"
        placeholder="Comment..."
        className={`${editMode && "showEdit"} inputEdit form-control`}
        value={comment}
        onChange={handleCommentChange}
      />
      {editMode
        ? getIcon("accept", "ic ic_lg ic_light toRight", (e) =>
            handleAddComment(e)
          )
        : getIcon("add", "ic ic_lg ic_light toRight", () => toggleEditMode())}
    </div>
  );
}
