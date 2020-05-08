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
  FaUserTimes,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GoPlus, GoCalendar, GoMegaphone } from "react-icons/go";
// import { GrDocumentTime } from "react-icons/gr";
import { TiMessages, TiDeleteOutline } from "react-icons/ti";
import { MdReplyAll, MdArrowBack } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { RiTimerFlashLine } from "react-icons/ri";

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

    case "addFile":
      iconObj = (
        <AiFillFileAdd
          className={classNames}
          style={{ fontSize: "1.75rem" }}
          onClick={onIconClick}
        />
      );
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

    case "reply":
      iconObj = <MdReplyAll className={classNames} onClick={onIconClick} />;
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

    case "delete":
      // iconObj = (
      //   <TiDeleteOutline
      //     className={classNames}
      //     style={{ fontSize: "1.75rem" }}
      //     onClick={onIconClick}
      //   />
      // );
      iconObj = <IoMdClose className={classNames} onClick={onIconClick} />;
      break;

    case "messages":
      iconObj = <TiMessages className={classNames} onClick={onIconClick} />;
      break;

    case "inv_amount":
      iconObj = (
        <FaFileInvoiceDollar className={classNames} onClick={onIconClick} />
      );
      break;

    case "doc_period":
      iconObj = <GoCalendar className={classNames} onClick={onIconClick} />;
      // iconObj = <GrDocumentTime className={classNames} onClick={onIconClick} />;
      break;

    case "pay_due":
      iconObj = (
        <RiTimerFlashLine className={classNames} onClick={onIconClick} />
      );
      break;

    case "btnBack":
      iconObj = <MdArrowBack className={classNames} onClick={onIconClick} />;
      break;

    /* Notification icons */
    case "notificationMsg":
      iconObj = <GoMegaphone className={classNames} onClick={onIconClick} />;
      break;

    default:
      break;
  }

  return iconObj;
}

export { getIcon };
