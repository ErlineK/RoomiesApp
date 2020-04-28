import React from "react";
import "./profile.scss";
import useToggle from "../../hooks/useToggle";
import useInputState from "../../hooks/useInputState";
import { FaUserEdit, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { getIcon } from "../../utils/iconManager";

export default function UserDataItem({ item, handleUpdate }) {
  const [editMode, toggleEdit] = useToggle(false);
  const [data, handleDataChange] = useInputState(item.data);

  const updateUser = e => {
    e.preventDefault();
    console.log("saving update");

    handleUpdate(item.title, data);

    // // TODO: handle avatar change
    toggleEdit();
  };

  return (
    <div>
      {editMode && handleUpdate ? (
        <div>
          <div className="flex-container flex-between">
            <label htmlFor={item.title}>{item.title}</label>
            <div className="toRight">
              <FaUserCheck
                className="actionIcon success_hov"
                onClick={e => updateUser(e)}
              />
              <FaUserTimes
                className="actionIcon abort"
                onClick={e => toggleEdit()}
              />
            </div>
          </div>
          <input
            id={item.title}
            type={item.type}
            name={item.title}
            placeholder={item.title}
            className="form-control"
            value={data}
            onChange={handleDataChange}
            required
          />
        </div>
      ) : (
        <div className="userDataItem">
          <div className="flex-container flex-between">
            <div className="flex-container">
              {getIcon(item.icon, " item userDataIcon")}
              <p className="item itemTitle">{item.title}:</p>
              <p className=" item itemData">{item.data}</p>
            </div>
            <div className="toRight">
              {handleUpdate
                ? getIcon("editUser", " actionIcon hiddenIcon edit", () =>
                    toggleEdit()
                  )
                : // <FaUserEdit
                  //   className=" actionIcon hiddenIcon edit"
                  //   onClick={() => toggleEdit()}
                  // />
                  ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
