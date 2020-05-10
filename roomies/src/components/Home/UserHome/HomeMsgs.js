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
import useToggle from "../../../hooks/useToggle";

// const defaultData = {
//   messages: [
//     {
//       _id: 6,
//       type: "NTF",
//       ntfType: "transfer",
//       date: new Date(2020, 1, 30),
//       msg: "Tenant 3 transfered you $200",
//       accepted: true,
//     },
//   ],
// };

// TODO: create use messages hook

/* NVT => Invitation to join a peoperty account
 * MSG => message on messages board
 * NTF => notification of paid bill/welcome/new tenant/birthdays(?)/transfer between tenants
 */

function HomeMsgs() {
  const { userId, getUserData } = useContext(AuthContext);
  const [acceptingINV, toggleAcceptingINV] = useToggle(false);
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

  useEffect(() => {
    /* if got notifications data after accepting invitation -> 
    get updated user data and and toggle accepting invitation state */
    if (acceptingINV) {
      getUserData();
      toggleAcceptingINV();
    }
  }, [data]);

  const handleAcceptINV = async (ntfId) => {
    toggleAcceptingINV();
    setRequest({
      url: `notifications/${userId}/${ntfId}`,
      reqType: "patch",
      reqData: { accepted: true, viewed: true },
    });
  };

  const handleDeclineINV = async (ntfId) => {
    toggleAcceptingINV();
    setRequest({
      url: `notifications/${userId}/${ntfId}`,
      reqType: "patch",
      reqData: { accepted: false, viewed: true },
    });
  };

  const getMsgObjByType = (msg) => {
    var msgObj;
    switch (msg.type) {
      case "MSG":
        msgObj = <GeneralMsgItem key={`msg${msg._id}`} item={msg} />;
        break;

      case "NVT":
        msgObj = (
          <InvitationMsgItem
            key={`msg${msg._id}`}
            item={msg}
            handleAcceptINV={handleAcceptINV}
            handleDeclineINV={handleDeclineINV}
          />
        );
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
