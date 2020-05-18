import React from "react";
import CircleLoader from "./Loader/CircleLoader";

export default function CardWithLoader(props, { loading }) {
  return (
    <div className="card user-main">
      <div className="floatingLoaderHolder">{loading && <CircleLoader />}</div>
      {props.children}
    </div>
  );
}
