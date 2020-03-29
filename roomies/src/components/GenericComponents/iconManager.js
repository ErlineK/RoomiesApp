import React from "react";
import { GiMailbox } from "react-icons/gi";
import { FaAt, FaUser, FaPhone } from "react-icons/fa";
import { AiOutlineLogout, AiFillWechat } from "react-icons/ai";

function getIcon(iconName, classNames) {
  let iconObj;
  switch (iconName) {
    case "email":
      iconObj = <FaAt className={classNames} />;
      break;

    case "name":
      iconObj = <FaUser className={classNames} />;
      break;

    case "phone":
      iconObj = <FaPhone className={classNames} />;
      break;

    default:
      break;
  }

  return iconObj;
}

export { getIcon };
