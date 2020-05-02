import React from "react";

// import { BsLightningFill } from "react-icons/bs";
import { GiHeatHaze, GiMilkCarton, GiPayMoney } from "react-icons/gi";
import { FaSatelliteDish } from "react-icons/fa";
import { RiLightbulbFlashLine } from "react-icons/ri";

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
