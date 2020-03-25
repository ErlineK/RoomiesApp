import React from "react";
import "../../GenericComponents/generic_list.scss";
import CircleLoader from "../../GenericComponents/Loader/CircleLoader";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

export default function HomeFragment(props) {
  return (
    <>
      {props.title !== "" && (
        <div className="titleContainer">{props.title}</div>
      )}
      {props.isLoading && <CircleLoader />}

      {props.isError || props.noData ? (
        <p>Sorry! No {props.itemsName} to display</p>
      ) : (
        <div className="listContainer">{props.children}</div>
      )}
    </>
  );
}
