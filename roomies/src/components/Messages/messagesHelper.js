import NofiticationMsgItem from "./NofiticationMsgItem";
import InvitationMsgItem from "./InvitationMsgItem";
import GeneralMsgItem from "./GeneralMsgItem";

function msgFormatDate(dateBase) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).format(dateBase);
}

export {
  InvitationMsgItem,
  NofiticationMsgItem,
  GeneralMsgItem,
  msgFormatDate
};
