import React, { Component } from "react";
import "../general.css";
import { Switch, Route, Link } from "react-router-dom";

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="centralHolder">
          <h3>USER HOME</h3>
        </div>
      </div>
    );
  }
}

export default UserHome;
