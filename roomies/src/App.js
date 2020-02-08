import React, { Component } from 'react';
// import './main.module.css'
import GenericButton from './GenericButton';
import Nav from './Nav';
import Profile from './Profile';


class App extends Component {
    render() {
        return ( 
            <div className = "App" >
                <Nav/>
                <Profile/>
                <GenericButton name = "woof" buttonClass="button red"/>
            </div>
        );
    }
}

export default App;