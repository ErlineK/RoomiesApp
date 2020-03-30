import React from "react";
import "./profile.scss";
import "../auth/auth.scss";
import UserDataItem from "./UserDataItem";
import { FaUserEdit, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { formatDateOnly } from "../GenericComponents/formatHelper";
import { getIcon } from "../GenericComponents/iconManager";
import useToggle from "../../hooks/useToggle";
import useInputState from "../../hooks/useInputState";

export default function SettingsProfile({ user }) {
  const [editMode, toggleEdit] = useToggle(false);
  const [name, handleNameChange] = useInputState(user.name);
  const [brthDate, handleBDayChange] = useInputState(user.brthDate);
  const [phone, handlePhoneChange] = useInputState(user.phone);
  const [avatar, handleavatarChange] = useInputState(user.img);

  const saveUpdate = (item, newVal) => {
    console.log(`changing user ${item} to ${newVal}`);
    // TODO: send user profile change to db
  };

  return (
    <div className="userDataHolder">
      <h3>Profile</h3>
      {/* {editMode ? (
        <div className="flex-container flex-center">
          <FaUserCheck
            className="sectionIcon success margRight"
            onClick={updateUser}
          />
          <FaUserTimes
            className="sectionIcon abort"
            onClick={() => toggleEdit()}
          />
        </div>
      ) : (
        <FaUserEdit className="sectionIcon" onClick={() => toggleEdit()} />
      )} */}

      <div className="flex-container flex-center from-container">
        <div>
          {user & (user.avatar !== "") ? (
            <img
              className="homeLogo avatar"
              src={require("../../assets/Logo.svg")}
              alt={"John doe"}
            />
          ) : (
            getIcon("user", "homeLogo avatar")
          )}
        </div>

        <div className="">
          <UserDataItem
            edit={editMode}
            item={{
              title: "Name",
              data: name,
              icon: "name",
              type: "text",
              saveUpdate: saveUpdate
            }}
          />
          <UserDataItem
            edit={editMode}
            item={{
              title: "Email",
              data: user.email,
              icon: "email"
            }}
          />
        </div>
        <div className="">
          <UserDataItem
            edit={editMode}
            item={{
              title: "Birth Date",
              data: formatDateOnly(brthDate),
              icon: "bday",
              type: "date",
              saveUpdate: saveUpdate
            }}
          />
          <UserDataItem
            edit={editMode}
            item={{
              title: "Phone",
              data: phone,
              icon: "phone",
              type: "phone",
              saveUpdate: saveUpdate
            }}
          />
        </div>
      </div>
    </div>
  );
}
