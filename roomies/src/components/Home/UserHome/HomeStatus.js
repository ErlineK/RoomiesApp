import React, { useEffect, useContext } from "react";
import useGetData from "../../../hooks/useGetData";
import HomeFragment from "./HomeFragment";
import { formatCurrency } from "../../../utils/formatHelper";
import { AuthContext } from "../../auth/AuthContext";
import { HouseContext } from "../../UserSettings/House/HouseContext";
import { getMyBalance } from "../../Balance/balanceHelper";

// TODO: create balance page

export default function HomeStatus() {
  const { userId } = useContext(AuthContext);
  const { activeHouseId } = useContext(HouseContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData({}, {});

  useEffect(() => {
    if (userId !== undefined && userId !== "") {
      setRequest({
        url: `bills/balance/${activeHouseId}/${userId}`,
        reqType: "get",
        reqData: {},
      });
    }
  }, []);

  const myBalance = getMyBalance(data.balance, userId);
  const balanceSum = (
    <h6 className={` ${myBalance > 0 ? "positivVal" : "negativeVal"} nav-link`}>
      {myBalance > 0
        ? `Roomies owe you ${formatCurrency(Math.abs(myBalance))}`
        : `You owe ${formatCurrency(Math.abs(myBalance))} total`}
    </h6>
  );

  const tenants =
    data && data.balance
      ? data.balance.map((roomie) =>
          roomie._id !== userId ? (
            <div key={roomie._id} className="balanceItem">
              <p
                className={`${roomie.totalBalance < 0 ? "red" : ""} underline`}
              >
                {roomie.user}
              </p>
              <p className="balance-text">
                {" "}
                {formatCurrency(roomie.totalBalance)}
              </p>
            </div>
          ) : (
            ""
          )
        )
      : "";

  return (
    <div className="homeItem">
      <div className="card">
        <HomeFragment
          isLoading={isLoading}
          isError={isError}
          noData={
            data === undefined || !data.balance || data.balance.length < 1
          }
          title={`Your total balance: ${formatCurrency(myBalance)}`}
          itemsName={"data"}
          linkTitle={"Break even"}
          linkPath={"Balance"}
        >
          <div className="listItemHolder">
            <div className="flex-container flex-around  ">{tenants}</div>
          </div>
          {balanceSum}
        </HomeFragment>
      </div>
    </div>
  );
}
