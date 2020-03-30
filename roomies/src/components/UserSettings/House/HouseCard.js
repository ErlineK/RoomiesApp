import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./house.scss";
import { GoPlus } from "react-icons/go";
import { FaEdit, FaEye } from "react-icons/fa";
import { AuthContext } from "../../auth/AuthContext";

export default function HouseCard({ house }) {
  const { userId, houseId } = useContext(AuthContext);

  const tenants = house
    ? house.tenants.map(tenant =>
        userId == tenant._id ? (
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
    console.log(me);
    return me.admin;
  }

  console.log(house);

  return (
    <div
      className={`${
        house && house.houseId === houseId ? "activeCard" : ""
      } card houseCardHolder`}
    >
      {house == undefined ? (
        <Link className="toCenter" to={"/AddHouse"}>
          <GoPlus className="fullCardIcon" />
        </Link>
      ) : (
        <>
          <Link className="" to={`/House/${house.houseId}`}>
            {house && house.houseId === houseId ? (
              <FaEdit className="sectionIcon" />
            ) : (
              <FaEye className="sectionIcon" />
            )}
          </Link>

          {house.houseId === houseId ? (
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
