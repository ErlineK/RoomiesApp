import React, { useState } from "react";
import "./settings.scss";
import HouseCard from "./House/HouseCard";
import SettingsProfile from "../Profile/SettingsProfile";
import useToggle from "../../hooks/useToggle";
import AddHousePop from "./House/AddHouse";

export default function UserSettings() {
  const [showNewHouse, toggleNewHouse] = useToggle(false);

  // TODO: get user data by id from db
  const defaultUser = {
    _id: "111",
    name: "John Doe",
    avatar: "",
    brthDate: new Date(1988, 0, 30),
    email: "john@doe.com",
    phone: "555-555-5555"
  };
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
      }
      // {
      //   active: false,
      //   houseId: "22222243",
      //   houseName: "Home sweet home",
      //   address: "12 Nothinghill Drive",
      //   city: "Paris",
      //   province: "ON",
      //   opened: new Date(2020, 1, 1),
      //   tenants: [
      //     {
      //       _id: "111",
      //       name: "Tenant 1",
      //       avatar: "",
      //       added: new Date(2020, 1, 1),
      //       admin: true
      //     },
      //     {
      //       _id: "2222",
      //       name: "Some Tenant",
      //       avatar: "",
      //       added: new Date(2020, 1, 15),
      //       admin: false
      //     },
      //     {
      //       _id: "2333",
      //       name: "Janne Doe",
      //       avatar: "",
      //       added: new Date(2020, 1, 12),
      //       admin: false
      //     }
      //   ],
      //   description:
      //     "Proin et diam eu eros dictum tincidunt sed dignissim turpis."
      // }
    ],
    userData: {}
  };

  // Temporary solution
  const [houses, setHouses] = useState(defaultProps.houses);

  const handleNewHouse = newHouse => {
    console.log(newHouse);

    // set all other houses to be not active
    const existingHouses = houses.map(house => ({ ...house, active: false }));

    setHouses([...existingHouses, newHouse]);
  };

  const houseItems = houses.map(house => (
    <HouseCard key={house.houseId} house={house} />
  ));

  return (
    <div className="card user-main">
      <SettingsProfile user={defaultUser} />
      <div className="housesHolder">
        {/* <h4>Houses</h4> */}
        <div className="flex-container flex-center">
          {houseItems}
          <HouseCard
            key="0"
            handleClick={() => toggleNewHouse()}
            handleNewHouse={handleNewHouse}
          />
        </div>
      </div>
      {showNewHouse && (
        <AddHousePop
          togglePop={toggleNewHouse}
          handleNewHouse={handleNewHouse}
        />
      )}
    </div>
  );
}
