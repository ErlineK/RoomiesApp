import React, { Component } from "react";
import "./auth.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      registrartionErrs: ""
    };

    this.doSubmit = this.doSubmit.bind(this);
    this.doOnChange = this.doOnChange.bind(this);
  }

  doSubmit(event) {
    console.log("clicked login");
    event.preventDefault();
    //TODO: validate fields
    // call to login WS goes here

    this.props.handleLogin();
  }

  //saves the state of form data
  doOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="from-container">
        <form onSubmit={this.doSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={this.state.email}
            onChange={this.doOnChange}
            required
            value="aa@aa.ca"
          />

          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={this.state.password}
            onChange={this.doOnChange}
            required
            value="111111"
          />

          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
