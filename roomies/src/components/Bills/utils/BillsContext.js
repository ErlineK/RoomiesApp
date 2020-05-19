import React, { createContext } from "react";
import useToggle from "../../../hooks/useToggle";
import useBillsState from "./useBillsState";

export const BillsContext = createContext();

export function BillsProvider(props) {
  const [{ bills, billActions, requestStatus }] = useBillsState();
  const [showAddBill, toggleAddBill] = useToggle(false);
  const [showAddPayment, toggleAddPayment] = useToggle(false);

  console.log("bills context is called");

  const addBill = async (bill) => {
    await billActions.addBill(bill);
    toggleAddBill();
  };

  const addPayment = async (payment, billId) => {
    await billActions.addBillPayment(payment, billId);
    toggleAddPayment();
  };

  const getBillById = (billId) => {
    const bill = bills
      ? bills.filter((bill) => bill._id === billId)
      : undefined;

    return bill ? bill[0] : undefined;
  };

  const billActs = {
    ...billActions,
    addBill: addBill,
    addBillPayment: addPayment,
    getBillById: getBillById,
  };

  return (
    <BillsContext.Provider
      value={{
        bills,
        billActs,

        showAddBill: showAddBill,
        toggleAddBill: toggleAddBill,

        // addBill: addBill,
        // editBill: billActions.editBill,
        // removeBill: billActions.removeBill,
        // // getAllBills: billActions.getAllBills,
        // acceptRoomieTransfer: billActions.acceptBill,
        // getBillById: getBillById,

        showAddPayment: showAddPayment,
        toggleAddPayment: toggleAddPayment,
        // addBillPayment: addPayment,
        // removePayment: billActions.removePayment,
        requestStatus: requestStatus,
      }}
    >
      {props.children}
    </BillsContext.Provider>
  );
}
