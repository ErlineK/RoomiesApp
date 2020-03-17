import React, { Component } from "react";
import "./app.scss";
import RoomiesApp from "./RoomiesApp";
import AppRouter from "./AppRouter";
import { AuthProvider } from "../auth/AuthContext";
import Navbar from "../Nav/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Navbar />
          <RoomiesApp />
          <AppRouter />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
