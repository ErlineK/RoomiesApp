import React, { useState } from "react";
import "./profile.scss";
import "../auth/auth.scss";
import UserDataItem from "./UserDataItem";
import { formatDateOnly } from "../GenericComponents/formatHelper";
import { getIcon } from "../GenericComponents/iconManager";
import UserAvatarSettings from "./UserAvatarSettings";

export default function SettingsProfile({ user }) {
  const [name, handleNameChange] = useState(user.name);
  const [brthDate, handleBDayChange] = useState(user.brthDate);
  const [phone, handlePhoneChange] = useState(user.phone);
  const [avatar, handleAvatarChange] = useState(user.img);

  const saveUpdate = (itemTitle, newVal) => {
    console.log(`changing user ${itemTitle} to ${newVal}`);

    switch (itemTitle) {
      case "Name":
        handleNameChange(newVal);
        break;

      case "Birth Date":
        handleBDayChange(newVal);
        break;

      case "Phone":
        handlePhoneChange(newVal);
        break;

      case "avatar":
        handleAvatarChange(newVal);
        break;
    }
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
        <UserAvatarSettings avatar={user.avatar} />
        {/* <div>
          {user & (user.avatar !== "") ? (
            <img
              className="homeLogo avatar"
              src={require("../../assets/Logo.svg")}
              alt={"John doe"}
            />
          ) : (
            getIcon("user", "homeLogo avatar")
          )}
        </div> */}

        <div className="">
          <UserDataItem
            item={{
              title: "Name",
              data: name,
              icon: "name",
              type: "text"
            }}
            handleUpdate={saveUpdate}
          />
          <UserDataItem
            item={{
              title: "Email",
              data: user.email,
              icon: "email"
            }}
          />
        </div>
        <div className="">
          <UserDataItem
            item={{
              title: "Birth Date",
              data: formatDateOnly(brthDate),
              icon: "bday",
              type: "date"
            }}
            handleUpdate={saveUpdate}
          />
          <UserDataItem
            item={{
              title: "Phone",
              data: phone,
              icon: "phone",
              type: "phone"
            }}
            handleUpdate={saveUpdate}
          />
        </div>
      </div>
    </div>
  );
}
