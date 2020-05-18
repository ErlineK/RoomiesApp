import React, { createContext } from "react";
import useToggle from "../../hooks/useToggle";
import useBalanceState from "../../hooks/useBalanceState";

export const BalanceContext = createContext();
export const BalanceActionsContext = createContext();

export function BalanceProvider(props) {
  console.log();
  const [data, requestStatus, myBalance] = useBalanceState();

  //   function myBalance() {
  //     console.log("called mybalance");
  //     return data && data.balance && data.balance.length > 0
  //       ? getMyBalance(data.balance, userId)
  //       : 0;
  //   }

  const balance = data && data.balance ? data.balance : data;

  return (
    <BalanceContext.Provider value={(balance, requestStatus)}>
      <BalanceActionsContext.Provider value={myBalance}>
        {props.children}
      </BalanceActionsContext.Provider>
    </BalanceContext.Provider>
  );
}
