import React, { Component } from 'react';
import NavSection from './NavSection';
import "./Navbar.css";

class Navbar extends Component {
    render() {
        let navArray = [];
        for (let i = 0; i < this.props.size; i++) {
            navArray.push(<NavSection name="cat" />)
        }
        return (
            <div className="Navbar-stuff">
                <img className="navLogo" src={require('./london.jpg')} alt="application logo" />
                <NavSection name="About" />
                <NavSection name="Help" />
                {navArray}
            </div>
        );
    }
}

export default Navbar;