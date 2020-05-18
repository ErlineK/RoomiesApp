import React, { createContext } from "react";
// import useToggle from "../../hooks/useToggle";
import useBalanceState from "../../../hooks/useBalanceState";

export const DashboardContext = createContext();
export const HomeBalanceContext = createContext();

export function DashboardProvider(props) {
  const [balanceData, requestStatus] = useBalanceState();

  // console.log("Dashboard context is called");

  return (
    <DashboardContext.Provider value={requestStatus}>
      <HomeBalanceContext.Provider value={balanceData}>
        {props.children}
      </HomeBalanceContext.Provider>
    </DashboardContext.Provider>
  );
}
