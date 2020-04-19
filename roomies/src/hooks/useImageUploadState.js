import { useState, useContext, useReducer } from "react";
import { BASE_URL } from "../utils/AppParams";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { AuthContext } from "../components/auth/AuthContext";
import imgUploadReducer from "../reducers/imgUpload.reducer";

/** Hook manages selecting image, preview and saving to DB
 */
export default (initImage, imgSource) => {
  const { userId, requestHeader, loginUser } = useContext(AuthContext);
  const [imgState, imgUploadDispatch] = useReducer(imgUploadReducer, {
    isLoading: false,
    isError: false,
    readyToUpload: false,
    displayImg: initImage
  });
  const [originalImg, setOriginalImg] = useState(initImage);

  const handleImageUpload = e => {
    e.preventDefault();

    let file = e.target.files[0];

    if (file) {
      imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 150
      })
        .then(compressedFile => {
          let reader = new FileReader();
          reader.onloadend = () => {
            imgUploadDispatch({ type: "UPLOAD_READY", payload: reader.result });
          };
          reader.readAsDataURL(compressedFile);
        })
        .catch(err => console.log(err));
    }
  };

  const handleSaveImage = e => {
    e.preventDefault();

    imgUploadDispatch({ type: "UPLOAD_INIT" });

    axios
      .put(
        `${BASE_URL}/users/avatar`,
        { userId: userId, avatar: imgState.displayImg },
        requestHeader
      )
      .then(res => {
        console.log("Saved avatar successfully");
        console.log(res);

        // update user in AuthContext
        loginUser(res.data.user, res.config.headers["x-auth-token"]);

        // update original image
        setOriginalImg(res.data.user.user_avatar);

        imgUploadDispatch({
          type: "UPLOAD_SUCCESS",
          payload: res.data.user.user_avatar
        });
      })
      .catch(error => {
        console.log(error.response.data.error);

        imgUploadDispatch({
          type: "UPLOAD_FAILURE"
        });
      });
  };

  const handleDismissImage = e => {
    e.preventDefault();

    imgUploadDispatch({ type: "UPLOAD_CANCEL", payload: originalImg });
  };

  return [imgState, handleSaveImage, handleDismissImage, handleImageUpload];
};
