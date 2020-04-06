import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./house.scss";
import { GoPlus } from "react-icons/go";
import { FaEdit, FaEye, FaUserPlus } from "react-icons/fa";
import { AuthContext } from "../../auth/AuthContext";
import { HouseContext } from "./HouseContext";

// TODO: set active card by data from server
// TODO: handle change active house in DB

export default function HouseCard({ house }) {
  const { userId, houseId } = useContext(AuthContext);
  const { handleAddTenants, showNewHouse, toggleNewHouse } = useContext(
    HouseContext
  );

  const tenants = house
    ? house.tenants.map(tenant =>
        userId === tenant._id ? (
          ""
        ) : (
          <li
            key={tenant._id}
            className={tenant.added === null ? "text-muted" : ""}
          >
            {tenant.name}
            <span className="small-note success">
              {tenant.admin && "admin"}
            </span>
            <span className="small-note abort">
              {tenant.added === null && "Not Approved"}
            </span>
          </li>
        )
      )
    : "";

  function amAdmin() {
    let me = house.tenants.find(tenant => tenant._id === userId);
    return me.admin;
  }

  return (
    <div
      className={`${
        house && house.active ? "activeCard" : ""
      } card houseCardHolder`}
      onClick={!house ? toggleNewHouse : null}
    >
      {house === undefined ? (
        <GoPlus className=" toCenter fullCardIcon" />
      ) : (
        <>
          <Link className="" to={`/House/${house.houseId}`}>
            {house && house.houseId === houseId ? (
              <FaEdit className="sectionIcon" />
            ) : (
              <FaEye className="sectionIcon" />
            )}
          </Link>
          {/* {house.houseId === houseId ? (
            <span className="small-note sectionNote">Active</span>
          ) : (
            ""
          )} */}
          {house && house.active ? (
            <span className="small-note sectionNote">Active</span>
          ) : (
            ""
          )}

          <img
            className="homeLogo houseAvatar"
            src={require("../../../assets/Logo.svg")}
            alt="house avatar"
          />
          <h5>{house.houseName}</h5>
          <p>{`${house.address} ${house.city}, ${house.province}`}</p>
          <div className="tenantsHolder">
            {/* Tenants can be added only to curently active house! */}
            {house && house.active && (
              <FaUserPlus
                className="sectionIcon"
                onClick={() => handleAddTenants(houseId)}
              />
            )}
            <ul>
              <li>
                You
                <span className="small-note success">
                  {amAdmin() ? "admin" : ""}
                </span>
              </li>
              {tenants}
            </ul>
          </div>
          <p>{house.description}</p>
        </>
      )}
    </div>
  );
}
