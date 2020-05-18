import { useContext, useEffect } from "react";
import useGetData from "./useGetData";
import { AuthContext } from "../components/auth/AuthContext";
import { HouseContext } from "../components/UserSettings/House/HouseContext";
import { getMyBalance } from "../components/Balance/balanceHelper";

export default () => {
  const { userId } = useContext(AuthContext);
  const { activeHouseId } = useContext(HouseContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData({}, {});

  useEffect(() => {
    if (userId && userId !== "") {
      setRequest({
        url: `bills/balance/${activeHouseId}/${userId}`,
        reqType: "get",
        reqData: {},
      });
    }
  }, [userId]);

  const myBalance =
    data && data.balance && data.balance.length > 0
      ? getMyBalance(data.balance, userId)
      : 0;

  const isMyId = (idToTest) => {
    return idToTest === userId;
  };

  // const requestStatus = [isLoading, isError];
  const requestStatus = { isLoading: isLoading, isError: isError };

  return [data, requestStatus, myBalance, isMyId];
};
