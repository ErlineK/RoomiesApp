import React, { useState } from "react";
import "../../Profile/profile.scss";
import "./house.scss";

export default function HouseAvatar({ avatar, addAvatarToForm }) {
  const [houseImage, setHouseImage] = useState(avatar);

  const handleImageUpload = e => {
    e.preventDefault();

    let file = e.target.files[0];
    console.log(file);

    if (file) {
      setHouseImage(URL.createObjectURL(file));

      // read data file for <img/> display
      let reader = new FileReader();
      reader.onloadend = () => {
        setHouseImage(reader.result);
        addAvatarToForm(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file.raw);
      const config = { headers: { "content-type": "multipart/form-data" } };
      console.log(config);

      //   TODO: upload image to server as house avatar or as house avatar
      // await uploadToBackend('endpoint', { image: file.raw }, config)
    }
  };

  const uploadButton = (
    <div className="edit">
      <label htmlFor="upload-house">
        <div>
          <img
            className={`homeLogo avatar edit ${
              houseImage === undefined || houseImage === "" ? "houseAvatar" : ""
            }`}
            src={
              (houseImage !== undefined) & (houseImage !== "")
                ? houseImage
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
