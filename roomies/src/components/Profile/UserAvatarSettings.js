import React, { useState, useContext } from "react";
import "./profile.scss";
import { getIcon } from "../../utils/iconManager";
import { FaUserEdit, FaUserCheck, FaUserTimes } from "react-icons/fa";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import useImageUploadState from "../../hooks/useImageUploadState";

// TODO: handle error message

export default function UserAvatarSettings({ avatar }) {
  const [
    { displayImg, isLoading, readyToUpload },
    handleSaveImage,
    handleDismissImage,
    handleImageUpload
  ] = useImageUploadState(avatar, "USER");

  const uploadButton = (
    <div className=" actionIcon hiddenIcon edit">
      <label htmlFor="upload-button">
        <FaUserEdit />
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );

  const saveSelection = (
    <div className="flex-container toRight doubleIconHolder">
      <FaUserCheck
        className="actionIcon doubleIcon success_hov"
        onClick={e => handleSaveImage(e)}
      />
      <FaUserTimes
        className="actionIcon doubleIcon abort"
        onClick={e => handleDismissImage(e)}
      />
    </div>
  );

  // prefer temporary image over user image
  // const imgToDisplay =
  //   (tempImage !== undefined) & (tempImage !== "") ? tempImage : userImage;

  return (
    <div className="userDataItem avatarHolder">
      {readyToUpload ? saveSelection : uploadButton}
      {isLoading ? (
        <CircleLoader />
      ) : (
        <div>
          {(displayImg !== undefined) & (displayImg !== "") ? (
            <img
              className="homeLogo avatar"
              src={displayImg}
              alt="user avatar"
              aria-label="User avatar"
            />
          ) : (
            getIcon("user", "homeLogo avatar")
          )}
        </div>
      )}
    </div>
  );
}
