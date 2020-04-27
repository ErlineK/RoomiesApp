import { useReducer, useState, useEffect, useContext } from "react";
import axios from "axios";
import dataFetchReducer from "../reducers/dataFetch.reducer";
import { AuthContext } from "../components/auth/AuthContext";

export default (initUri, initData) => {
  const { requestHeader } = useContext(AuthContext);
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
        const result = await axios(url, null, requestHeader());
        if (!didCancel) {
          /*** IMPORTANT! uncheck this line once server side added to project! ****/
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          // dispatch({ type: "FETCH_SUCCESS", payload: initData });
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
