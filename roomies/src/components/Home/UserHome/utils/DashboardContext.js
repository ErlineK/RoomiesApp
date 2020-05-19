import React, { createContext, useContext } from "react";
import { AuthContext } from "../../../auth/utils/AuthContext";
import { BillsContext } from "../../../Bills/utils/BillsContext";

export const DashboardContext = createContext();
export const HomeBalanceContext = createContext();
export const HomeBillsContext = createContext();
export const HomeUserContext = createContext();

export function DashboardProvider(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { bills } = useContext(BillsContext);

  const homeBills =
    bills && bills.length > 0
      ? bills
          .filter((b) => b.due_date || (b.payments && !b.payments[0].accepted))
          .slice(0, 5)
      : bills;

  console.log("Dashboard context is called");

  return (
    <DashboardContext.Provider>
      <HomeUserContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userName: user ? user.name : "",
          activeHouseId: user ? user.active_house : undefined,
        }}
      >
        {/* <HomeBalanceContext.Provider value={{ balance, balanceStatus }}> */}
        <HomeBillsContext.Provider
          value={
            homeBills
            // requestStatus,
          }
        >
          {props.children}
        </HomeBillsContext.Provider>
        {/* </HomeBalanceContext.Provider> */}
      </HomeUserContext.Provider>
    </DashboardContext.Provider>
  );
}
