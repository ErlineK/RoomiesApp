import React, { Component } from "react";
import "./app.scss";
import RoomiesApp from "./RoomiesApp";
import AppRouter from "./AppRouter";
import { AuthProvider } from "../auth/utils/AuthContext";
import { HouseProvider } from "../UserSettings/House/utils/HouseContext";
import Navbar from "../Nav/Navbar";
import { BillsProvider } from "../Bills/utils/BillsContext";
import { DashboardProvider } from "../Home/UserHome/utils/DashboardContext";
import { BalanceProvider } from "../Balance/utils/BalanceContext";
import { NotificationsProvider } from "../Messages/utils/NotificationsContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <HouseProvider>
            <Navbar />
            <NotificationsProvider>
              <BalanceProvider>
                <BillsProvider>
                  <DashboardProvider>
                    <RoomiesApp />
                    <AppRouter />
                  </DashboardProvider>
                </BillsProvider>
              </BalanceProvider>
            </NotificationsProvider>
          </HouseProvider>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
