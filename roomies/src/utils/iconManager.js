import React from "react";
import {
  FaAt,
  FaUser,
  FaPhone,
  FaBirthdayCake,
  FaEdit,
  FaEye,
  FaUserPlus,
  FaMinusCircle,
  FaCheck,
  FaUserEdit,
  FaUserCheck,
  FaUserTimes
} from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TiMessages } from "react-icons/ti";
import { MdReplyAll } from "react-icons/md";

function getIcon(iconName, classNames, onIconClick) {
  let iconObj;
  switch (iconName) {
    case "email":
      iconObj = <FaAt className={classNames} onClick={onIconClick} />;
      break;

    case "name":
      iconObj = <FaUser className={classNames} onClick={onIconClick} />;
      break;

    case "user":
      iconObj = <FaUser className={classNames} onClick={onIconClick} />;
      break;

    case "phone":
      iconObj = <FaPhone className={classNames} onClick={onIconClick} />;
      break;

    case "bday":
      iconObj = <FaBirthdayCake className={classNames} onClick={onIconClick} />;
      break;

    case "add":
      iconObj = <GoPlus className={classNames} onClick={onIconClick} />;
      break;

    case "addUser":
      iconObj = <FaUserPlus className={classNames} onClick={onIconClick} />;
      break;

    case "editUser":
      iconObj = <FaUserEdit className={classNames} onClick={onIconClick} />;
      break;

    case "acceptUser":
      iconObj = <FaUserCheck className={classNames} onClick={onIconClick} />;
      break;

    case "declineUser":
      iconObj = <FaUserTimes className={classNames} onClick={onIconClick} />;
      break;

    case "edit":
      iconObj = <FaEdit className={classNames} onClick={onIconClick} />;
      break;

    case "watch":
      iconObj = <FaEye className={classNames} onClick={onIconClick} />;
      break;

    case "accept":
      iconObj = <FaCheck className={classNames} onClick={onIconClick} />;
      break;

    case "decline":
      iconObj = <FaMinusCircle className={classNames} onClick={onIconClick} />;
      break;

    case "messages":
      iconObj = <TiMessages className={classNames} onClick={onIconClick} />;
      break;

    default:
      break;
  }

  return iconObj;
}

export { getIcon };
