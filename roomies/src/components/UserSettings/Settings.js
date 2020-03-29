import React, { Component, memo, useState } from "react";
import "./settings.scss";
import HouseCard from "./House/HouseCard";
import UserDataItem from "../Profile/UserDataItem";
import useToggle from "../../hooks/useToggle";
import { FaUserEdit } from "react-icons/fa";

export default function UserSettings() {
  const [editMode, toggleEdit] = useToggle(false);
  // TODO: get houses list by user id from db
  const defaultProps = {
    houses: [
      {
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
        houseId: "22222243",
        houseName: "Another cool house",
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
            name: "John Doe",
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

  const houses = defaultProps.houses.map(house => (
    <HouseCard key={house.houseId} house={house} />
  ));

  return (
    <div className="card user-main">
      <div className="userDataHolder">
        <h3>Profile</h3>
        <div className="toLeft">
          <FaUserEdit className="sectionIcon" onClick={() => toggleEdit()} />
          <div>
            <UserDataItem
              edit={editMode}
              item={{ title: "Email", data: "John@Doe.ca", icon: "email" }}
            />
            <UserDataItem
              edit={editMode}
              item={{ title: "Name", data: "John Doe", icon: "name" }}
            />
            <UserDataItem
              edit={editMode}
              item={{ title: "Phone", data: "555-555-5555", icon: "phone" }}
            />
          </div>
        </div>
        <div className="toLeft">
          <FaUserEdit className="sectionIcon" onClick={() => toggleEdit()} />
          <div>
            <UserDataItem
              edit={editMode}
              item={{ title: "Email", data: "John@Doe.ca", icon: "email" }}
            />
            <UserDataItem
              edit={editMode}
              item={{ title: "Name", data: "John Doe", icon: "name" }}
            />
            <UserDataItem
              edit={editMode}
              item={{ title: "Phone", data: "555-555-5555", icon: "phone" }}
            />
          </div>
        </div>
      </div>
      <div className="housesHolder">
        <h4>Houses</h4>
        <div className="flex-container">
          {houses}
          <HouseCard />
        </div>
      </div>
    </div>
  );
}
