import React, { useContext } from "react";
import "./settings.scss";
import HouseCard from "./House/HouseCard";
import SettingsProfile from "../Profile/SettingsProfile";
import AddHousePop from "./House/AddHouse";
import { HouseContext } from "./House/HouseContext";
import AddTenantsPop from "./House/Tenants/AddTenantsPop";

// TODO: get houses list by user id from db order by active
const defaultProps = {
  houses: [
    {
      active: true,
      houseId: "123434",
      houseName: "My house",
      address: "122 Baker st.",
      city: "London",
      province: "ON",
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
      address: "12 Nothinghill Drive",
      city: "Paris",
      province: "ON",
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
        }
      ],
      description:
        "Proin et diam eu eros dictum tincidunt sed dignissim turpis."
    }
  ],
  userData: {}
};

export default function UserSettings() {
  const { houses, setHouses, showNewHouse, showAddTenants } = useContext(
    HouseContext
  );

  const houseItems = houses
    ? houses.map(house => <HouseCard key={house._id} house={house} />)
    : "";

  return (
    <div className="card user-main">
      <SettingsProfile />
      <div className="housesHolder">
        {/* <h4>Houses</h4> */}
        {!houses && (
          <p className="toCenter">Add new house and invite Roomies</p>
        )}
        <div className="flex-container flex-center">
          {houseItems}
          <HouseCard key="house0" />
        </div>
      </div>
      {showNewHouse && <AddHousePop />}
      {showAddTenants && <AddTenantsPop />}
    </div>
  );
}
