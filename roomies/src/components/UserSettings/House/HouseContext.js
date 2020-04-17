import React, { createContext, useEffect, useContext, useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { BASE_URL } from "../../../utils/AppParams";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

export const HouseContext = createContext();

export function HouseProvider(props) {
  const { requestHeader, userId } = useContext(AuthContext);
  const [houses, setHousesState] = useState();
  const [houseTenants, setHouseTenants] = useState();
  const [showAddTenants, toggleAddTenants] = useToggle(false);
  const [showNewHouse, toggleNewHouse] = useToggle(false);
  const [selectedHouseId, setSelectedHouseId] = useState("");

  useEffect(() => {
    if (userId !== undefined && userId !== "") {
      console.log("Trying to he houses for user " + userId);

      // get houses from DB
      axios
        .get(`${BASE_URL}/houses/${userId}`, requestHeader)
        .then(res => {
          console.log("got houses successfully");
          console.log(res);

          setHouses(res.data.houses);
        })
        .catch(error => {
          console.log("Get houses Error: ");
          console.log(error);
          // console.log(error.response.data.error);
        });
    }
  }, [userId]);

  const setSelectedHouse = houseId => {
    setSelectedHouseId(houseId);
    console.log("calling setHouseTenants in setSelectedHouse");
    setHouseTenants(getCurrentHouseTenants());
  };

  const setHouses = houses => {
    // save currently active house id (later get it from Auth context)
    let activeHouseId = undefined;
    houses.map(house => {
      if (house.active) {
        activeHouseId = house._id;
      }
    });

    console.log("active house id:" + activeHouseId);

    setSelectedHouseId(activeHouseId);
    setHousesState(houses);
  };

  const handleAddTenants = houseId => {
    setSelectedHouse(houseId);
    toggleAddTenants();
  };

  const handleNewHouse = newHouse => {
    if (userId !== undefined && userId !== "") {
      console.log("Trying to add house for user " + userId);

      // add curent user as house tenant
      newHouse.tenants.push(userId);

      console.log(newHouse);

      // add new house to DB
      axios
        .post(
          `${BASE_URL}/houses`,
          { userId: userId, newHouse: newHouse },
          requestHeader
        )
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
    // set all other houses to be not active
    // const existingHouses = houses.map(house => ({ ...house, active: false }));

    // setHouses([...existingHouses, newHouse]);
  };

  const handleNewTenant = newTenant => {
    console.log(newTenant);

    // check if tenant's email exist in list
    const tenantInList = houseTenants.filter(
      tenant => tenant.email === newTenant.email
    );

    if (tenantInList.length == 0) {
      console.log("trying to add tenants to tenants list");
      // TODO: add tenant to house in DB
      setHouseTenants(tnState => [...tnState, newTenant]);

      const updatedhouses = houses.map(house =>
        house.houseId === selectedHouseId
          ? { ...house, tenants: [...house.tenants, newTenant] }
          : house
      );
      console.log("updated houses:");
      console.log(updatedhouses);
      setHouses(updatedhouses);
    } else {
      console.log("tenant alredy in list");
      console.log(tenantInList);
    }
  };

  const selectedHouse = () => {
    console.log("selectedHouse");
    console.log(houses);
    const selectedHouse = houses.filter(
      house => house.houseId === selectedHouseId
    );

    return selectedHouse;
  };

  const getCurrentHouseTenants = () => {
    const selectedhouseObj = selectedHouse();
    console.log("selected house object:");
    console.log(selectedhouseObj);
    return selectedhouseObj[0].tenants;
  };

  return (
    <HouseContext.Provider
      value={{
        houses: houses,
        houseTenants: houseTenants,
        setHouses: setHouses,
        showNewHouse: showNewHouse,
        toggleNewHouse: toggleNewHouse,
        handleNewHouse: handleNewHouse,
        showAddTenants: showAddTenants,
        toggleAddTenants: toggleAddTenants,
        handleNewTenant: handleNewTenant,
        handleAddTenants: handleAddTenants,
        activeHouseId: selectedHouseId,
        setSelectedHouse: setSelectedHouse
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
}
