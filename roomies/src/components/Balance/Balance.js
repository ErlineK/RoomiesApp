import React, { useContext, useEffect } from "react";
import useGetData from "../../hooks/useGetData";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";
import { AuthContext } from "../auth/AuthContext";
import { HouseContext } from "../UserSettings/House/HouseContext";

export default function Balance() {
  const { userId } = useContext(AuthContext);
  const { activeHouseId } = useContext(HouseContext);
  const [{ data, isLoading, isError }, setRequest] = useGetData(
    {
      url: `bills/balance/${activeHouseId}/${userId}`,
      reqType: "get",
      reqData: {},
    },
    {}
  );

  useEffect(() => {
    // if (userId !== undefined && userId !== "") {
    //   setRequest({
    //     url: `bills/balance/${activeHouseId}/${userId}`,
    //     reqType: "get",
    //     reqData: {},
    //   });
    // }
  }, []);

  return (
    <div className="card user-main">
      <div className="floatingLoaderHolder">
        {isLoading && <CircleLoader />}
      </div>
      <h3>Roomies Balance</h3>

      <div className="billsHolder listContainer">This is roomies data</div>
    </div>
  );
}
