import React, { createContext, useEffect, useContext, useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { BASE_URL } from "../../../utils/AppParams";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

export const HouseContext = createContext();

// TODO: create houses state hook

export function HouseProvider(props) {
  const { requestHeader, user, loginUser } = useContext(AuthContext);

  const [houses, setHousesState] = useState();
  // const [houseTenants, setHouseTenants] = useState();
  const [showAddTenants, toggleAddTenants] = useToggle(false);
  const [showNewHouse, toggleNewHouse] = useToggle(false);
  const [selectedHouseId, setSelectedHouseId] = useState("");

  useEffect(() => {
    if (user !== undefined && user._id !== undefined) {
      console.log("Trying to he houses for user " + user._id);

      // get houses from DB
      axios
        .get(`${BASE_URL}/houses/${user._id}`, requestHeader)
        .then(res => {
          console.log("got houses successfully");
          console.log(res);

          setHouses(res.data.houses);
        })
        .catch(error => {
          console.log("Get houses Error: ");
          // console.log(error);
          console.log(error.response.data.error);
        });
    }
  }, [user]);

  // const setSelectedHouse = houseId => {
  //   setSelectedHouseId(houseId);
  //   console.log("calling setHouseTenants in setSelectedHouse");
  //   setHouseTenants(getCurrentHouseTenants());
  // };

  const setHouses = houses => {
    setSelectedHouseId(user.active_house);
    setHousesState(houses);
  };

  const handleNewHouse = newHouse => {
    if (user !== undefined && user._id !== "") {
      console.log("Trying to add house for user " + user._id);
      console.log(newHouse);

      // add new house to DB.
      // responds with updated user
      // getHouses called upon user updates
      axios
        .post(
          `${BASE_URL}/houses/${user._id}`,
          { userId: user._id, newHouse: newHouse },
          requestHeader
        )
        .then(res => {
          console.log("Added new house successfully");
          console.log(res);

          loginUser(res.data.user);
        })
        .catch(error => {
          console.log("Get houses Error: ");
          // console.log(error);
          console.log(error.response.data.error);
        });
    }
  };

  const handleNewTenant = (email, name) => {
    // check if tenant's email exist in list
    const currentHouse = selectedHouse();
    console.log(currentHouse);

    const tenantInList =
      currentHouse && currentHouse.house_tenants
        ? currentHouse.house_tenants.filter(tenant => tenant.email === email)
        : [];

    if (tenantInList.length == 0) {
      console.log("trying to add tenants to tenants list");

      axios
        .put(
          `${BASE_URL}/houses/${user._id}/tenants`,
          { houseId: selectedHouseId, email, name },
          requestHeader
        )
        .then(res => {
          console.log("updated house tenants successfully");
          console.log(res);

          console.log("updated houses:");
          console.log(res.data.houses);
          setHouses(res.data.houses);

          toggleAddTenants();
        })
        .catch(error => {
          console.log("Get houses Error: ");
          console.log(error.response.data.error);
          return error.response.data.error;
        });
    } else {
      console.log("tenant alredy in list");
      console.log(tenantInList);
      return "Tenant already exist";
    }
  };

  const selectedHouse = () => {
    return houses.filter(house => house._id === user.active_house);
  };

  // const getCurrentHouseTenants = () => {
  //   const selectedhouseObj = selectedHouse();
  //   console.log("selected house object:");
  //   console.log(selectedhouseObj);
  //   return selectedhouseObj[0].house_tenants;
  // };

  return (
    <HouseContext.Provider
      value={{
        houses: houses,
        setHouses: setHouses,
        activeHouseId: user ? user.active_house : "",
        selectedHouse: selectedHouse,

        showNewHouse: showNewHouse,
        toggleNewHouse: toggleNewHouse,
        handleNewHouse: handleNewHouse,

        showAddTenants: showAddTenants,
        toggleAddTenants: toggleAddTenants,
        handleNewTenant: handleNewTenant

        // setSelectedHouse: setSelectedHouse
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
}
