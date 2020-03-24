import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import dataFetchReducer from "../reducers/dataFetch.reducer";

export default (initUri, initData) => {
  const [url, setUrl] = useState(initUri);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });

  useEffect(() => {
    let didCancel = false; //to prevent state changing after component unmount
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          /*** IMPORTANT! uncheck this line once server side added to project! ****/
          // dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          dispatch({ type: "FETCH_SUCCESS", payload: initData });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
