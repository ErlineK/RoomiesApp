import React, { Component } from 'react';
import "./NavSection.css";

class NavSection extends Component {
    render() {
        return ( 
            <p className="NavSection-stuff">{this.props.name}</p>
        );
    }
}

export default NavSection;