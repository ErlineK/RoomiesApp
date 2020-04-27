import { useReducer, useState, useEffect, useContext } from "react";
import axios from "axios";
import dataFetchReducer from "../reducers/dataFetch.reducer";
import { BASE_URL } from "../utils/AppParams";
import { AuthContext } from "../components/auth/AuthContext";

export default ({ reqUri, reqType, reqData }, initData) => {
  const { requestHeader } = useContext(AuthContext);
  const [requst, setRequest] = useState({
    url: reqUri,
    reqType: reqType,
    reqData: reqData
  });
  const [state, fetchDispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });

  useEffect(() => {
    let didCancel = false; //to prevent state changing after component unmount
    const fetchData = async () => {
      fetchDispatch({ type: "FETCH_INIT" });
      try {
        const response = await axios[requst.reqType](
          `${BASE_URL}/${requst.url}`,
          requst.reqData,
          requestHeader
        );
        console.log("got response on useGetData for " + requst.url);
        console.log(response);

        if (!didCancel) {
          fetchDispatch({ type: "FETCH_SUCCESS", payload: response.data });
        }
      } catch (error) {
        // console.log(error);
        console.log(error.response.data.error);
        if (!didCancel) {
          fetchDispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    if (
      requst !== undefined &&
      requst.url !== undefined &&
      requst.reqType !== undefined
    ) {
      fetchData();
    }
    return () => {
      didCancel = true;
    };
  }, [requst]);

  return [state, setRequest];
};
