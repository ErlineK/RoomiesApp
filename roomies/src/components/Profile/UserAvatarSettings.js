import React, { useState, useContext } from "react";
import "./profile.scss";
import { getIcon } from "../../utils/iconManager";
import { FaUserEdit, FaUserCheck, FaUserTimes } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { BASE_URL } from "../../utils/AppParams";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import imageCompression from "browser-image-compression";

// TODO: create useImageUpload hook

export default function UserAvatarSettings({ avatar }) {
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(avatar);
  const [tempImage, setTempImage] = useState(avatar);
  const { userId, requestHeader, loginUser } = useContext(AuthContext);

  const handleImageUpload = e => {
    e.preventDefault();
    console.log("selected image");

    let file = e.target.files[0];
    console.log(file);

    if (file) {
      imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 150
      })
        .then(compressedFile => {
          setTempImage(URL.createObjectURL(compressedFile));

          let reader = new FileReader();
          reader.onloadend = () => {
            // result is base64 of the image file
            setTempImage(reader.result);
            setReadyToUpload(true);
          };
          reader.readAsDataURL(compressedFile);
        })
        .catch(err => console.log(err));
    }
  };

  const handleSaveImage = e => {
    e.preventDefault();

    setLoading(true);

    axios
      .put(
        `${BASE_URL}/users/avatar`,
        { userId: userId, avatar: tempImage },
        requestHeader
      )
      .then(res => {
        console.log("Saved image successfully");
        console.log(res);
        //  display image from form
        setUserImage(res.data.user.avatar);
        setReadyToUpload(false);

        // update user in AuthContext
        loginUser(res.data.user, "");

        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log("Login Error: ");
        console.log(error.response.data.error);
        // TODO: handle error message
        setLoading(false);
      });
  };

  const handleCancelImage = e => {
    e.preventDefault();

    setTempImage(undefined);
    setReadyToUpload(false);
  };

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
        onClick={e => handleCancelImage(e)}
      />
    </div>
  );

  // prefer temporary image over user image
  const imgToDisplay =
    (tempImage !== undefined) & (tempImage !== "") ? tempImage : userImage;

  return (
    <div className="userDataItem avatarHolder">
      {readyToUpload ? saveSelection : uploadButton}
      {isLoading ? (
        <CircleLoader />
      ) : (
        <div>
          {(imgToDisplay !== undefined) & (imgToDisplay !== "") ? (
            <img
              className="homeLogo avatar"
              src={imgToDisplay}
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
