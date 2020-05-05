import { useContext, useEffect } from "react";
import useGetData from "./useGetData";
import { AuthContext } from "../components/auth/AuthContext";
import { HouseContext } from "../components/UserSettings/House/HouseContext";

export default (initialBills) => {
  const { userId } = useContext(AuthContext);
  const { activeHouseId } = useContext(HouseContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData(
    {
      // reqUri: `bills/${houseId}`,
      // reqType: "get",
      // reqData: null
    },
    initialBills
  );

  useEffect(() => {
    if (userId && activeHouseId) {
      getAllBills();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, activeHouseId]);

  const getAllBills = () => {
    setRequest({
      url: `bills/${activeHouseId}/${userId}`,
      reqType: "get",
      reqData: null,
    });
  };

  const addBill = async (bill) => {
    await setRequest({
      url: `bills/${activeHouseId}/${userId}`,
      reqType: "post",
      reqData: bill,
    });

    console.log("added New bill.");
    console.log(data);
  };

  const editBill = (newBill, billId) => {
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, task: newTask } : chore
    // );
    // setChores(updatedChores);
  };

  const addBillPayment = async (payment, billId) => {
    console.log("requesting new payment for bill Id: " + billId);

    const newPayemnt = {
      ...payment,
      house_ref: activeHouseId,
      from_user: userId,
    };
    setRequest({
      url: `bills/payment/${billId}/${userId}`,
      reqType: "post",
      reqData: newPayemnt,
    });
  };

  const removeBill = (billId) => {
    setRequest({
      url: `bills/payment/${billId}/${userId}`,
      reqType: "delete",
    });
    // const updatedChores = data.chores.filter(chore => chore.id !== choreId);
    // setChores(updatedChores);
  };

  const billActions = {
    addBill: addBill,
    editBill: editBill,
    removeBill: removeBill,
    getAllBills: getAllBills,
    addBillPayment: addBillPayment,
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [data, billActions, requestStatus];
};
