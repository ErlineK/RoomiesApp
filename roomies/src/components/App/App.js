import React, { Component } from "react";
import "./app.scss";
import RoomiesApp from "./RoomiesApp";
import AppRouter from "./AppRouter";
import { AuthProvider } from "../auth/AuthContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <div className="appContainer">
            <RoomiesApp />
            <AppRouter />
          </div>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
