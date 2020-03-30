import React from "react";
import "./profile.scss";
import UserDataItem from "./UserDataItem";
import { FaUserEdit } from "react-icons/fa";
import { formatDateOnly } from "../GenericComponents/formatHelper";
import { getIcon } from "../GenericComponents/iconManager";
import useToggle from "../../hooks/useToggle";

export default function SettingsProfile({ user }) {
  const [editMode, toggleEdit] = useToggle(false);
  return (
    <div className="userDataHolder">
      <h3>Profile</h3>
      <FaUserEdit className="sectionIcon" onClick={() => toggleEdit()} />
      <div className="flex-container flex-center">
        <div>
          {user & (user.avatar != "") ? (
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
            item={{ title: "Name", data: user.name, icon: "name" }}
          />
          <UserDataItem
            edit={editMode}
            item={{ title: "Email", data: user.email, icon: "email" }}
          />
        </div>
        <div className="">
          <UserDataItem
            edit={editMode}
            item={{
              title: "Birth Date",
              data: formatDateOnly(user.birthD),
              // data: "30 Jan 1988",
              icon: "bday"
            }}
          />
          <UserDataItem
            edit={editMode}
            item={{ title: "Phone", data: user.phone, icon: "phone" }}
          />
        </div>
      </div>
    </div>
  );
}
