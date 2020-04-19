import React, { useState, useEffect } from "react";
import "../../Profile/profile.scss";
import "./house.scss";
import useImageUploadState from "../../../hooks/useImageUploadState";

export default function HouseAvatar({ avatar, addAvatarToForm }) {
  const [
    { displayImg },
    handleSaveImage,
    handleDismissImage,
    handleImageUpload
  ] = useImageUploadState(avatar, "HOUSE");
  // const [houseImage, setHouseImage] = useState(avatar);

  useEffect(() => {
    addAvatarToForm(displayImg);
  }, [displayImg]);

  // const handleImageUpload = e => {
  //   e.preventDefault();

  //   let file = e.target.files[0];
  //   console.log(file);

  //   if (file) {
  //     // read data file for <img/> display
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       setHouseImage(reader.result);
  //       addAvatarToForm(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     const formData = new FormData();
  //     formData.append("image", file.raw);
  //     const config = { headers: { "content-type": "multipart/form-data" } };
  //     console.log(config);

  //     //   TODO: upload image to server as house avatar or as house avatar
  //     // await uploadToBackend('endpoint', { image: file.raw }, config)
  //   }
  // };

  const uploadButton = (
    <div className="edit">
      <label htmlFor="upload-house">
        <div>
          <img
            className={`homeLogo avatar edit ${
              displayImg === undefined || displayImg === "" ? "houseAvatar" : ""
            }`}
            src={
              (displayImg !== undefined) & (displayImg !== "")
                ? displayImg
                : require("../../../assets/Logo.svg")
            }
            alt="home avatar"
            aria-label="Home avatar"
          />
        </div>
      </label>
      <input
        type="file"
        id="upload-house"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );

  return <div className="userDataItem avatarHolder">{uploadButton}</div>;
}
