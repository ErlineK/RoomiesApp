import React, { memo } from "react";
import HomeFragment from "./HomeFragment";
import { formatCurrency } from "../../../utils/formatHelper";
import useBalanceState from "../../../hooks/useBalanceState";

function HomeBalance() {
  const [data, requestStatus, myBalance, isMyId] = useBalanceState();
  const balance = data ? data.balance : data;

  let balanceMsg =
    myBalance > 0
      ? `Roomies owe you ${formatCurrency(Math.abs(myBalance))}`
      : `You owe ${formatCurrency(Math.abs(myBalance))} total`;

  const balanceSum = (
    <h6
      className={` ${myBalance >= 0 ? "positivVal" : "negativeVal"} nav-link`}
    >
      {balanceMsg}
    </h6>
  );

  const tenants =
    balance && balance.length > 0
      ? balance.map((roomie) =>
          !isMyId(roomie._id) ? (
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
          isLoading={requestStatus.isLoading}
          isError={requestStatus.isError}
          noData={balance === undefined || !balance || balance.length < 1}
          title={`Your total balance: ${formatCurrency(myBalance)}`}
          itemsName={"data"}
          linkTitle={"Break even"}
          linkPath={"Balance"}
        >
          <div className="listItemHolder">
            <div className="flex-container flex-around  ">{tenants}</div>
          </div>
          {myBalance !== 0.0 && balanceSum}
        </HomeFragment>
      </div>
    </div>
  );
}

export default memo(HomeBalance);
