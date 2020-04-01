import React from "react";
import "./settings.scss";
import HouseCard from "./House/HouseCard";
import useToggle from "../../hooks/useToggle";
import SettingsProfile from "../Profile/SettingsProfile";

export default function UserSettings() {
  // TODO: get houses list by user id from db
  const defaultProps = {
    houses: [
      {
        active: true,
        houseId: "123434",
        houseName: "My house",
        opened: new Date(2019, 3, 4),
        tenants: [
          {
            _id: "111",
            name: "Tenant 1",
            avatar: "",
            added: new Date(2019, 4, 30),
            admin: false
          },
          {
            _id: "222",
            name: "Tenant 2",
            avatar: "",
            added: new Date(2019, 5, 15),
            admin: false
          },
          {
            _id: "333",
            name: "Tenant 3",
            avatar: "",
            added: new Date(2019, 5, 12),
            admin: false
          },
          {
            _id: "123",
            name: "Tenant 4",
            avatar: "",
            added: new Date(2019, 3, 4),
            admin: true
          }
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et diam eu eros dictum tincidunt sed dignissim turpis."
      },
      {
        active: false,
        houseId: "22222243",
        houseName: "Home sweet home",
        opened: new Date(2020, 1, 1),
        tenants: [
          {
            _id: "111",
            name: "Tenant 1",
            avatar: "",
            added: new Date(2020, 1, 1),
            admin: true
          },
          {
            _id: "2222",
            name: "Some Tenant",
            avatar: "",
            added: new Date(2020, 1, 15),
            admin: false
          },
          {
            _id: "2333",
            name: "Janne Doe",
            avatar: "",
            added: new Date(2020, 1, 12),
            admin: false
          },
          {
            _id: "2123",
            name: "Tenant 4",
            avatar: "",
            added: new Date(2020, 1, 10),
            admin: false
          }
        ],
        description:
          "Proin et diam eu eros dictum tincidunt sed dignissim turpis."
      }
    ],
    userData: {}
  };
  // TODO: get user data by id from db
  const defaultUser = {
    _id: "111",
    name: "John Doe",
    img: "../../ assets / Logo.svg",
    brthDate: new Date(1988, 0, 30),
    email: "john@doe.com",
    phone: "555-555-5555"
  };

  const houses = defaultProps.houses.map(house => (
    <HouseCard key={house.houseId} house={house} />
  ));

  return (
    <div className="card user-main">
      <SettingsProfile user={defaultUser} />
      <div className="housesHolder">
        {/* <h4>Houses</h4> */}
        <div className="flex-container">
          {houses}
          <HouseCard />
        </div>
      </div>
    </div>
  );
}
