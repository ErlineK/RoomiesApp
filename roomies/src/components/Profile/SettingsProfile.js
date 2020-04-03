import React, { useState } from "react";
import "./profile.scss";
import "../auth/auth.scss";
import UserDataItem from "./UserDataItem";
import { formatDateOnly } from "../GenericComponents/formatHelper";
import UserAvatarSettings from "./UserAvatarSettings";

export default function SettingsProfile({ user }) {
  const [name, handleNameChange] = useState(user.name);
  const [brthDate, handleBDayChange] = useState(user.brthDate);
  const [phone, handlePhoneChange] = useState(user.phone);
  const [avatar, handleAvatarChange] = useState(user.avatar);

  const saveUpdate = (itemTitle, newVal) => {
    console.log(`changing user ${itemTitle} to ${newVal}`);

    switch (itemTitle) {
      case "Name":
        handleNameChange(newVal);
        break;

      case "Birth Date":
        let newDate = new Date(newVal);
        // add a day
        newDate.setDate(newDate.getDate() + 1);
        handleBDayChange(newDate);
        break;

      case "Phone":
        handlePhoneChange(newVal);
        break;

      case "avatar":
        handleAvatarChange(newVal);
        break;

      default:
        break;
    }
    // TODO: send user profile change to db
  };

  return (
    <div className="userDataHolder">
      <h3>Profile</h3>

      <div className="flex-container flex-center from-container">
        <UserAvatarSettings avatar={avatar} />

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
