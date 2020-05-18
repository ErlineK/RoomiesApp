import React, { createContext } from "react";
import useToggle from "../../hooks/useToggle";
import useBillsState from "../../hooks/useBillsState";

export const BillsContext = createContext();

export function BillsProvider(props) {
  const [data, billActions, requestStatus] = useBillsState();
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
    const bill =
      data && data.bills
        ? data.bills.filter((bill) => bill._id === billId)
        : undefined;

    return bill ? bill[0] : undefined;
  };

  return (
    <BillsContext.Provider
      value={{
        bills: data && data.bills ? data.bills : data,
        showAddBill: showAddBill,
        toggleAddBill: toggleAddBill,

        addBill: addBill,
        editBill: billActions.editBill,
        removeBill: billActions.removeBill,
        // getAllBills: billActions.getAllBills,
        acceptRoomieTransfer: billActions.acceptBill,
        getBillById: getBillById,

        showAddPayment: showAddPayment,
        toggleAddPayment: toggleAddPayment,
        addBillPayment: addPayment,
        removePayment: billActions.removePayment,
        requestStatus: requestStatus,
      }}
    >
      {props.children}
    </BillsContext.Provider>
  );
}
