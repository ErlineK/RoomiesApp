import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./house.scss";
import { GoPlus } from "react-icons/go";
import { FaEdit, FaEye } from "react-icons/fa";
import { AuthContext } from "../../auth/AuthContext";

// TODO: set active card by data from server
// TODO: handle change active house in DB

export default function HouseCard({ house, handleClick }) {
  const { userId, houseId } = useContext(AuthContext);

  const tenants = house
    ? house.tenants.map(tenant =>
        userId === tenant._id ? (
          ""
        ) : (
          <li key={tenant._id}>
            {tenant.name}
            <span className="small-note success">
              {tenant.admin && "admin"}
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
      // className={`${
      //   house && house.houseId === houseId ? "activeCard" : ""
      // } card houseCardHolder`}
      className={`${
        house && house.active ? "activeCard" : ""
      } card houseCardHolder`}
      onClick={handleClick ? handleClick : null}
    >
      {house === undefined ? (
        // <Link className="toCenter" to={"/AddHouse"}>
        <GoPlus className=" toCenter fullCardIcon" />
      ) : (
        // </Link>
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
          <ul>
            <li>
              You
              <span className="small-note success">
                {amAdmin() ? "admin" : ""}
              </span>
            </li>
            {tenants}
          </ul>
          <p>{house.description}</p>
        </>
      )}
    </div>
  );
}
