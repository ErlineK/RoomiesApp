import React from "react";

// import { BsLightningFill } from "react-icons/bs";
import {
  GiHeatHaze,
  GiMilkCarton,
  GiPayMoney,
  GiPodiumWinner,
} from "react-icons/gi";
import { FaSatelliteDish } from "react-icons/fa";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";

export function getIconByBillType(billType, classNames) {
  let iconObj;
  switch (billType) {
    case "Hydro":
      iconObj = <RiLightbulbFlashLine className={classNames} />;
      break;

    case "Gas":
      iconObj = <GiHeatHaze className={classNames} />;
      break;

    case "Internet/TV":
      iconObj = <FaSatelliteDish className={classNames} />;
      break;

    case "Groceries":
      iconObj = <GiMilkCarton className={classNames} />;
      break;

    default:
      iconObj = <GiPayMoney className={classNames} />;
      break;
  }

  return iconObj;
}

export function getIconByAction(actionType, classNames) {
  let iconObj;
  switch (actionType) {
    case "payment":
      iconObj = <GiPayMoney className={classNames} />;
      break;

    case "comment":
      iconObj = <TiMessages className={classNames} />;
      break;

    case "complete":
      iconObj = <GiPodiumWinner className={classNames} />;
      break;

    default:
      iconObj = <GiPayMoney className={classNames} />;
      break;
  }

  return iconObj;
}
