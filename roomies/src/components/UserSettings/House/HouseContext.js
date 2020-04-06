import React, { createContext, useState } from "react";
import useToggle from "../../../hooks/useToggle";

export const HouseContext = createContext();

// TODO: create house state manager

export function HouseProvider(props) {
  const [houses, setHousesState] = useState();
  const [houseTenants, setHouseTenants] = useState();
  const [showAddTenants, toggleAddTenants] = useToggle(false);
  const [showNewHouse, toggleNewHouse] = useToggle(false);
  const [selectedHouseId, setSelectedHouseId] = useState("");

  const setSelectedHouse = houseId => {
    setSelectedHouseId(houseId);
    console.log("calling setHouseTenants in setSelectedHouse");
    setHouseTenants(getCurrentHouseTenants());
  };

  const setHouses = houses => {
    // save currently active house id (later get it from Auth context)
    const activeHouseId = houses.map(house =>
      house.active ? house.houseId : null
    );

    console.log("active house id:");
    console.log(activeHouseId[0]);

    setSelectedHouseId(activeHouseId[0]);
    setHousesState(houses);
  };

  const handleAddTenants = houseId => {
    setSelectedHouse(houseId);
    toggleAddTenants();
  };

  const handleNewHouse = newHouse => {
    // axios
    //   .post("http://localhost:3000/users/register", userObject)
    //   .then(res => {
    //     console.log("Registered successfully");
    //     //TODO: redirect to thank you page with second part of registration
    //   })
    //   .catch(error => {
    //     console.log("Registration Error");
    //   });

    // set all other houses to be not active
    const existingHouses = houses.map(house => ({ ...house, active: false }));

    setHouses([...existingHouses, newHouse]);
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
        selectedHouseId: selectedHouseId,
        setSelectedHouse: setSelectedHouse
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
}
