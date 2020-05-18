import React from "react";
import CardWithLoader from "../GenericComponents/CardWithLoader";
import useBalanceState from "../../hooks/useBalanceState";
import { formatCurrency } from "../../utils/formatHelper";
// import BalanceChart from "../GenericComponents/Charts/BalanceChart";
import ColumnChart from "../GenericComponents/Charts/ColumnChart";
import RoomiePieChart from "../GenericComponents/Charts/RoomiePieChart";

export default function Balance() {
  const [data, requestStatus, myBalance, isMyId] = useBalanceState();
  const balance = data ? data.balance : data;

  const tenants =
    balance && balance.length > 0
      ? balance.map((roomie) => (
          <div key={roomie._id} className="balanceItem">
            <p className={`${roomie.totalBalance < 0 ? "red" : ""} underline`}>
              {isMyId(roomie._id) ? "Me" : roomie.user}
            </p>
            <p className="balance-text">
              {" "}
              {formatCurrency(roomie.totalBalance)}
            </p>
          </div>
        ))
      : "";

  const billsData = balance
    ? balance.map((roomie) => ({
        name: isMyId(roomie._id) ? "Me" : roomie.user,
        balance: roomie.totals.paidBills,
        even: roomie.totals.billsEven,
      }))
    : undefined;

  const billsEven = balance ? balance[0].totals.billsEven : undefined;

  const rtDataTranferred = balance
    ? balance
        .filter((r) => !isMyId(r._id) && r.totals.transfered > 0)
        .map((roomie) => ({
          name: roomie.user,
          balance: Math.abs(roomie.totals.transfered),
          title: "From Me",
        }))
    : undefined;

  const rtDataReceived = balance
    ? balance
        .filter((r) => !isMyId(r._id) && r.totals.received > 0)
        .map((roomie) => ({
          name: roomie.user,
          balance: Math.abs(roomie.totals.received),
          title: "To Me",
        }))
    : undefined;

  return (
    <CardWithLoader loading={requestStatus.isLoading}>
      <h4>Roomies Balance</h4>
      <div className="billsHolder listContainer">
        <div className="flex-container flex-around  ">{tenants}</div>
      </div>
      <div className="billsHolder listContainer">
        <div className="centerRsp">
          {billsData && (
            <ColumnChart
              title={"Total Bills Paid"}
              data={billsData}
              even={billsEven}
            />
          )}
        </div>
        <div className="flex-container flex-columns-holder billsHolder">
          {rtDataReceived && rtDataReceived.length > 0 && (
            <RoomiePieChart
              title={"Roomie Transfers (To me)"}
              data={rtDataReceived}
            />
          )}
          {rtDataTranferred && rtDataTranferred.length > 0 && (
            <RoomiePieChart
              title={"Roomie Transfers (From me)"}
              data={rtDataTranferred}
            />
          )}
        </div>
      </div>
    </CardWithLoader>
  );
}
