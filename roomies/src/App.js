import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import About from "./components/About/About";
import "./app.css";
import Bills from "./components/Bills/Bills";
import GroupChat from "./components/groupchat/GroupChat";
import Home from "./home/home";
import Profile from "./Profile";
import HouseList from "./components/HouseList/houselist";
import Registration from "./auth/Registration";
import Navbar from "./Navbar";
import Login from "./auth/Login";
import UserHome from "./UserHome/UserHome";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState(st => ({ loggedIn: true }));
  }

  render() {
    return (
      <div className="App">
        <div className="appContainer">
          {!this.state.loggedIn ? (
            <Navbar
              cat={[
                { title: "Logo", path: "" },
                { title: "About", path: "About" },
                { title: "Help", path: "About" }
              ]}
            />
          ) : (
            <Navbar
              cat={[
                { title: "Logo", path: "UserHome" },
                { title: "Edit", path: "Profile" },
                { title: "Bills", path: "Bills" },
                { title: "GroupChat", path: "GroupChat" }
              ]}
            />
          )}

          {this.state.loggedIn && <Redirect to="/UserHome" />}

          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home handleLogin={this.handleLogin} />}
            />
            <Route exact path="/Profile" component={Profile} />
            <Route
              exact
              path="/About"
              render={() => <About name="Pugsy" city="London" />}
            />
            <Route exact path="/Registration" render={() => <Registration />} />
            <Route
              exact
              path="/Login"
              render={() => <Login handleLogin={this.handleLogin} />}
            />
            <Route exact path="/Bills" component={Bills} />
            <Route exact path="/GroupChat" component={GroupChat} />
            <Route exact path="/HouseList" component={HouseList} />
            <Route exact path="/UserHome" render={() => <UserHome />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
