import React from "react";
import { FaAt, FaUser, FaPhone, FaBirthdayCake } from "react-icons/fa";

function getIcon(iconName, classNames) {
  let iconObj;
  switch (iconName) {
    case "email":
      iconObj = <FaAt className={classNames} />;
      break;

    case "name":
      iconObj = <FaUser className={classNames} />;
      break;

    case "user":
      iconObj = <FaUser className={classNames} />;
      break;

    case "phone":
      iconObj = <FaPhone className={classNames} />;
      break;

    case "bday":
      iconObj = <FaBirthdayCake className={classNames} />;
      break;

    default:
      break;
  }

  return iconObj;
}

export { getIcon };
