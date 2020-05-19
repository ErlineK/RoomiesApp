import React from "react";
import "./profile.scss";
import { getIcon } from "../../utils/iconManager";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import useImageUploadState from "../../hooks/useImageUploadState";

// TODO: handle error message

export default function UserAvatarSettings({ avatar }) {
  const [
    { displayImg, isLoading, readyToUpload },
    handleSaveImage,
    handleDismissImage,
    handleImageUpload,
  ] = useImageUploadState(avatar, "USER");

  const uploadButton = (
    <div className=" actionIcon hiddenIcon edit">
      <label htmlFor="upload-button">{getIcon("editUser")}</label>
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
      {getIcon("acceptUser", "actionIcon doubleIcon success_hov", (e) =>
        handleSaveImage(e)
      )}
      {getIcon("declineUser", "actionIcon doubleIcon success_hov", (e) =>
        handleDismissImage(e)
      )}
    </div>
  );

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
