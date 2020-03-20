import React from "react";
import "../../GenericComponents/general.scss";
import "../../GenericComponents/generic_list.scss";
import useGetRoomiesData from "../../../hooks/useGetRoomiesData";
import HomeFragment from "./HomeFragment";
import { Link } from "react-router-dom";
import GeneralMsgItem from "../../Messages/GeneralMsgItem";
import InvitationMsgItem from "../../Messages/InvitationMsgItem";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

export default function HomeMsgs() {
  //TODO: get 5 recent messages from DB ordered by date DSC
  const [{ data, isLoading, isError }] = useGetRoomiesData(USER_SERVICE_URL, {
    messages: [
      {
        _id: 1,
        type: "MSG",
        author: "Tenant One",
        date: new Date(2017, 11, 17),
        msg: "Forgot to walk the cow. Beers on me"
      },
      {
        _id: 2,
        type: "NVT",
        author: "Some Tenant",
        date: new Date(2018, 2, 14),
        propertyName: "Home Sweet Home",
        propertyAddress: "123 Over the Hill Rd.",
        propertyCity: "Wonderland"
      },
      {
        _id: 3,
        type: "MSG",
        author: "Tenant Three",
        date: new Date(2019, 3, 18),
        msg: "Blah!"
      },
      {
        _id: 4,
        type: "MSG",
        author: "Tenant One",
        date: new Date(2020, 3, 18),
        msg: "No pain no gain"
      }
    ]
  });

  // TODO: create notification item

  const getMsgObjByType = msg => {
    var msgObj;
    switch (msg.type) {
      case "MSG":
        msgObj = <GeneralMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "NVT":
        msgObj = <InvitationMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      default:
        break;
    }

    return msgObj;
  };

  const msgs = data.messages.map((msg, i) => getMsgObjByType(msg));

  return (
    <div className="card">
      <HomeFragment
        isLoading={isLoading}
        isError={isError}
        noData={data.messages == "undefined" || data.messages.length < 1}
        title={"Latest messages"}
        itemsName={"messages"}
      >
        <div className="listContainer">
          {/* <div className="titleContainer">this is title</div> */}
          {msgs}
          <div className="listItemHolder">List item</div>
          <div className="listItemHolder">Another item</div>
        </div>
      </HomeFragment>
      <Link className="secondary-link underline nav-link" to="/Chat">
        Leave a message >>
      </Link>
    </div>
  );
}
