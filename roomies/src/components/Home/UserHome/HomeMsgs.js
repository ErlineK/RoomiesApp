import React, { useContext, useEffect, memo } from "react";
import "../../GenericComponents/ui/generic_list.scss";
import useGetData from "../../../hooks/useGetData";
import HomeFragment from "./HomeFragment";
import { AuthContext } from "../../auth/AuthContext";
import {
  InvitationMsgItem,
  NofiticationMsgItem,
  GeneralMsgItem,
  ApprovalMsgItem,
} from "../../Messages/msgComponents";

const defaultData = {
  messages: [
    {
      _id: 1,
      type: "MSG",
      author: "Tenant One",
      date: new Date(2017, 11, 17),
      msg: "Forgot to walk the cow. Beers on me",
    },
    {
      _id: 6,
      type: "NTF",
      ntfType: "transfer",
      date: new Date(2020, 1, 30),
      msg: "Tenant 3 transfered you $200",
      accepted: true,
    },
    {
      _id: 4,
      type: "NTF",
      ntfType: "general",
      date: new Date(2020, 2, 22),
      msg: "Welcome Tenant 2 to Home Sweet Home",
    },
    {
      _id: 2,
      type: "NVT",
      author: "Some Tenant",
      date: new Date(2018, 2, 14),
      propertyName: "Home Sweet Home",
      propertyAddress: "123 Over the Hill Rd.",
      propertyCity: "Wonderland",
      accepted: true,
    },
  ],
};

function HomeMsgs() {
  const { userId } = useContext(AuthContext);
  //TODO: get 5 recent messages from DB ordered by date DSC
  /* NVT => Invitation to join a peoperty account
   * MSG => message on messages board
   * NTF => notification of paid bill/welcome/new tenant/birthdays(?)/transfer between tenants
   */

  const [{ data, isLoading, isError }, setRequest] = useGetData({}, {});

  useEffect(() => {
    if (userId !== undefined && userId !== "") {
      setRequest({
        url: `notifications/${userId}`,
        reqType: "get",
        reqData: {},
      });
    }
  }, []);

  const getMsgObjByType = (msg) => {
    var msgObj;
    switch (msg.type) {
      case "MSG":
        msgObj = <GeneralMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "NVT":
        msgObj = <InvitationMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "NTF":
        msgObj = <NofiticationMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "TRNS":
        msgObj = <ApprovalMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      default:
        break;
    }

    return msgObj;
  };

  const msgs =
    data !== undefined && Object.entries(data).length > 0
      ? data.messages.map((msg, i) => getMsgObjByType(msg))
      : "";

  return (
    <div className="homeHolder homeItem">
      <div className="card ">
        <HomeFragment
          isLoading={isLoading}
          isError={isError}
          noData={
            data === undefined ||
            data.messages === undefined ||
            data.messages.length < 1
          }
          title={""}
          itemsName={"messages"}
        >
          <div className="listContainer">{msgs}</div>
        </HomeFragment>
      </div>
    </div>
  );
}

export default memo(HomeMsgs);
