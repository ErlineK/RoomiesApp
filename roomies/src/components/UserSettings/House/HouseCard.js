import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./house.scss";
import { getIcon } from "../../../utils/iconManager";
// import { GoPlus } from "react-icons/go";
// import {
//   FaEdit,
//   FaEye,
//   FaUserPlus,
//   FaMinusCircle,
//   FaCheck
// } from "react-icons/fa";
import { AuthContext } from "../../auth/AuthContext";
import { HouseContext } from "./HouseContext";

// TODO: handle change active house in DB

export default function HouseCard({ house }) {
  const { userId } = useContext(AuthContext);
  const { activeHouseId, toggleAddTenants, toggleNewHouse } = useContext(
    HouseContext
  );

  const handleDeclineInvitation = (e) => {
    e.preventDefault();

    console.log("declining invitation");
    // TODO: remove tenant from house
    // TODO: delete invitation item related to that user & house
  };

  const handleAcceptInvitation = (e) => {
    e.preventDefault();

    console.log("accepting invitation");
    // TODO: set invitation to accepted
    // TODO: add tenant to approved
    // TODO: send other tenants welcome notification
  };

  const tenants =
    house && house.house_tenants
      ? house.house_tenants.map((tenant) =>
          userId === tenant._id ? (
            ""
          ) : (
            <li
              key={tenant._id}
              className={
                !house.approved_tenants.includes(tenant._id) ? "text-muted" : ""
              }
            >
              {tenant.name}
              <span className="small-note success">
                {house.admin === tenant._id && "admin"}
              </span>
              <span className="small-note abort">
                {!house.approved_tenants.includes(tenant._id) && "Not Approved"}
              </span>
            </li>
          )
        )
      : "";

  const houseActive = house && house._id === activeHouseId;
  const houseApproved = house && house.approved_tenants.includes(userId);

  return (
    <div
      className={`${houseActive ? "activeCard" : ""} card houseCardHolder`}
      onClick={!house ? toggleNewHouse : null}
    >
      {house === undefined ? (
        getIcon("add", "toCenter fullCardIcon")
      ) : (
        // <GoPlus className=" toCenter fullCardIcon" />
        <>
          {houseApproved && (
            <Link className="" to={`/House/${house._id}`}>
              {
                houseActive
                  ? getIcon("edit", "sectionIcon")
                  : // <FaEdit className="sectionIcon" />
                    getIcon("watch", "sectionIcon")
                // <FaEye className="sectionIcon" />
              }
            </Link>
          )}

          {houseActive ? (
            <span className="small-note sectionNote">Active</span>
          ) : (
            ""
          )}

          <img
            className={`homeLogo houseAvatar ${
              house.avatar && house.avatar !== "" ? "houseAvatarImg" : ""
            }`}
            src={
              house.avatar && house.avatar !== ""
                ? house.avatar
                : require("../../../assets/Logo.svg")
            }
            alt="house avatar"
          />

          <h5>{house.houseName}</h5>
          <p>{`${house.address} ${house.city}, ${house.province}`}</p>
          <div className="tenantsHolder">
            {/* Tenants can be added only to curently active house! */}
            {houseActive &&
              houseApproved &&
              getIcon("addUser", "sectionIcon", () => toggleAddTenants())}
            {/* <FaUserPlus
                  className="sectionIcon"
                  onClick={() => toggleAddTenants()}
                /> */}
            <ul>
              <li>
                You
                <span className="small-note success">
                  {house.admin === userId ? "admin" : ""}
                </span>
              </li>
              {tenants}
            </ul>
          </div>
          <p>{house.description}</p>

          {!houseApproved && (
            <div>
              <div className="buttonsHolder">
                <button
                  className="btn btn-grad-green btn-grad-red btnAction"
                  onClick={(e) => handleDeclineInvitation(e)}
                >
                  {getIcon("decline", "accent-icon")}
                  {/* <FaMinusCircle className="accent-icon" /> */}
                  Decline
                </button>
                <button
                  className="btn btn-grad-green btnAction"
                  onClick={(e) => handleAcceptInvitation(e)}
                >
                  {getIcon("accept", "accent-icon")}
                  {/* <FaCheck className="accent-icon" /> */}
                  Accept
                </button>
              </div>
              <p>You were invited to join this house</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
