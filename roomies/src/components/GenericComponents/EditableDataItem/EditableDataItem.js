import React from "react";
import "./editableDataItem.scss";
import "../../GenericComponents/ui/icons.scss";
import useToggle from "../../../hooks/useToggle";
import useInputState from "../../../hooks/useInputState";
import { getIcon } from "../../../utils/iconManager";
import { formatInputDate } from "../../../utils/formatHelper";

export default function EditableDataItem({ item, handleUpdate }) {
  const [editMode, toggleEdit] = useToggle(false);
  const [data, handleDataChange] = useInputState(item.data);

  const updateItem = (e) => {
    e.preventDefault();

    handleUpdate(item.dbName, data);
    toggleEdit();
  };

  return (
    <>
      {editMode && handleUpdate ? (
        <div className="editableDataItem">
          <div className="flex-container flex-between flex-center-vertical">
            <label htmlFor={item.title}>{item.title}</label>
            <div className="toRight flex-container">
              {getIcon("acceptUser", "ic ic_lg ic_success", (e) =>
                updateItem(e)
              )}
              {/* <FaUserCheck
                className="actionIcon success_hov"
                onClick={(e) => updateItem(e)}
              /> */}
              {getIcon("declineUser", "ic ic_lg ic_alert active", (e) =>
                toggleEdit()
              )}
              {/* {getIcon(
                "declineUser",
                "ic ic_lg ic_alert actionIcon hover",
                (e) => toggleEdit()
              )} */}
            </div>
          </div>
          <input
            id={item.title}
            type={item.type}
            name={item.title}
            placeholder={item.title}
            className="form-control"
            value={item.type === "date" ? formatInputDate(data) : data}
            onChange={handleDataChange}
            required
          />
        </div>
      ) : (
        <div className="editableDataItem">
          <div className="flex-container flex-between">
            <div className="flex-container">
              {getIcon(item.icon, "ic ic_lg ic_decore")}
              <p className="item itemTitle">
                {item.title}
                {item.title && ":"}
              </p>
              <p className=" item itemData">{item.data}</p>
            </div>
            <div className="toRight">
              {handleUpdate
                ? getIcon("editUser", "ic ic_lg ic_hidden ic_roomies", () =>
                    toggleEdit()
                  )
                : ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
