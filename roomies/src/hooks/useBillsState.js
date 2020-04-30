import { useContext, useEffect } from "react";
import axios from "axios";
import useGetData from "./useGetData";
import { AuthContext } from "../components/auth/AuthContext";

const choresMode = { HOME: "HOME", NONE: undefined };

export default (initialBills, mode) => {
  const { houseId } = useContext(AuthContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData(
    {
      reqUri: `bills/${houseId}`,
      reqType: "get",
      reqData: null
    },
    initialBills
  );

  useEffect(() => {}, [houseId]);

  const getAllBills = () => {
    console.log("calling getAllBills from useBillsState for mode: " + mode);

    setRequest({
      reqUri: `bills/${houseId}`,
      reqType: "get",
      reqData: null
    });
  };

  const addBill = async bill => {
    // TODO: modify bill for request
    setRequest({
      reqUri: `bills/${houseId}`,
      reqType: "post",
      reqData: bill
    });
  };

  const editBill = (newBill, billId) => {
    // const updatedChores = data.chores.map(chore =>
    //   chore.id === choreId ? { ...chore, task: newTask } : chore
    // );
    // setChores(updatedChores);
  };

  const removeBill = billId => {
    // const updatedChores = data.chores.filter(chore => chore.id !== choreId);
    // setChores(updatedChores);
  };

  const billActions = {
    addBill: addBill,
    editBill: editBill,
    removeBill: removeBill,
    getAllBills: getAllBills
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [data, billActions, requestStatus];
};
