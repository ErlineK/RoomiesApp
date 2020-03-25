// import React, { Component } from "react";
// import "./navbar.scss";
// import { NavLink } from "react-router-dom";
// import uuid from "uuid";

// class SideNav extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       navItems: [this.props.navItems]
//     };
//   }

//   render() {
//     let navArray = this.props.navItems.map(ni => (
//       <NavLink
//         key={uuid()}
//         className="side-nav-link-container"
//         activeClassName="side-nav-link-active"
//         to={`/${ni.path}`}
//       >
//         <p className="side-nav-link">{ni.title}</p>
//       </NavLink>
//     ));
//     return (
//       <div className="side-nav">
//         <section className="nav-content-holder">{navArray}</section>
//       </div>
//     );
//   }
// }

// export default SideNav;
