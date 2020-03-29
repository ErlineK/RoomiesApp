import React from "react";
import { Link } from "react-router-dom";
import "./house.scss";
import { GoPlus } from "react-icons/go";

export default function HouseCard({ house }) {
  // const defaultProps = {
  //   _id: 111,
  //   houseNick: "My House",
  //   img: "",
  //   tenants: ["tenant 1", "tenant 2", "tenant 3"]
  // };

  const tenants = house
    ? house.tenants.map(tenant => <li key={tenant._id}>{tenant.name}</li>)
    : "";

  console.log(house);

  return (
    <div className="card houseCardHolder">
      {house == undefined ? (
        <Link className="toCenter" to={"/AddHouse"}>
          <GoPlus className="fullCardIcon" />
        </Link>
      ) : (
        <>
          <img
            className="homeLogo houseAvatar"
            src={require("../../../assets/Logo.svg")}
            alt="house avatar"
          />
          <h5>{house.houseName}</h5>

          <ul>
            <li>You</li>
            {tenants}
          </ul>

          <p>{house.description}</p>

          <div className="buttonsHolder">
            <Link className="btn btn-grad " to={`/House/${house.houseId}`}>
              Edit
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
