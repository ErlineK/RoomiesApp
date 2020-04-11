import React, { useState } from "react";
import "./profile.scss";
import { FaUserEdit } from "react-icons/fa";
import { getIcon } from "../../utils/iconManager";

export default function UserAvatarSettings({ avatar }) {
  const [userImage, setUserImage] = useState(avatar);

  const handleImageUpload = e => {
    e.preventDefault();
    console.log("selected image");

    let file = e.target.files[0];
    console.log(file);

    if (file) {
      setUserImage(URL.createObjectURL(file));

      // read data file for <img/> display
      let reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file.raw);
      const config = { headers: { "content-type": "multipart/form-data" } };
      console.log(config);

      //   TODO: upload image to server as user avatar or as house avatar
      // await uploadToBackend('endpoint', { image: file.raw }, config)
    }
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

  return (
    <div className="userDataItem avatarHolder">
      {uploadButton}
      <div>
        {(userImage !== undefined) & (userImage !== "") ? (
          <img
            className="homeLogo avatar"
            src={userImage}
            alt="user avatar"
            aria-label="User avatar"
          />
        ) : (
          getIcon("user", "homeLogo avatar")
        )}
      </div>
    </div>
  );
}
