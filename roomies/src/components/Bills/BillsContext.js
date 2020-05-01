import React, { createContext, useEffect, useContext, useState } from "react";
import useToggle from "../../hooks/useToggle";
import useBillsState from "../../hooks/useBillsState";

export const BillsContext = createContext();

export function BillsProvider(props) {
  const [data, billActions, requestStatus] = useBillsState();
  const [showAddBill, toggleAddBill] = useToggle(false);

  return (
    <BillsContext.Provider
      value={{
        bills: data && data.bills ? data.bills : data,
        showAddBill: showAddBill,
        toggleAddBill: toggleAddBill,
        addBill: billActions.addBill,
        editBill: billActions.editBill,
        removeBill: billActions.removeBill,
        getAllBills: billActions.getAllBills,
        requestStatus: requestStatus
      }}
    >
      {props.children}
    </BillsContext.Provider>
  );
}
