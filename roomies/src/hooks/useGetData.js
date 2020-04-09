import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import dataFetchReducer from "../reducers/dataFetch.reducer";

// const BASE_URL = "http://localhost:8082/api";
// const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export default ({ reqUri, reqType, reqData }, initData) => {
  const [requst, setRequest] = useState({
    // url: `${BASE_URL}/${reqUri}`,
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
    console.log("entered use effect on useGetData");

    let didCancel = false; //to prevent state changing after component unmount
    const fetchData = async () => {
      fetchDispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios[requst.reqType](requst.url, requst.reqData);
        console.log(result);

        if (!didCancel) {
          /*** IMPORTANT! uncheck this line once server side added to project! ****/
          // fetchDispatch({ type: "FETCH_SUCCESS", payload: result.data });
          fetchDispatch({ type: "FETCH_SUCCESS", payload: initData });
        }
      } catch (error) {
        if (!didCancel) {
          fetchDispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [requst]);

  return [state, setRequest];
};
