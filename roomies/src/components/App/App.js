import React, { Component } from "react";
import "./app.scss";
import RoomiesApp from "./RoomiesApp";
import AppRouter from "./AppRouter";
import { AuthProvider } from "../auth/AuthContext";
import { HouseProvider } from "../UserSettings/House/HouseContext";
import Navbar from "../Nav/Navbar";
import { BillsProvider } from "../Bills/BillsContext";
// import { DashboardProvider } from "../Home/UserHome/DashboardContext";
import { BalanceProvider } from "../Balance/BalanceContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <HouseProvider>
            <Navbar />
            {/* <DashboardProvider> */}
            <BalanceProvider>
              <BillsProvider>
                <RoomiesApp />
                <AppRouter />
              </BillsProvider>
            </BalanceProvider>
            {/* </DashboardProvider> */}
          </HouseProvider>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
