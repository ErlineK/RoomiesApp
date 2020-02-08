import React, { Component } from 'react';
// import './main.module.css'
import GenericButton from './GenericButton';
import Nav from './Nav';
import Profile from './Profile';
import TextBox from './TextBox';


class App extends Component {
    render() {
        return ( 
            <div className = "App" >
                <Nav/>
                <Profile/>
                <GenericButton name="woof" buttonClass="button red"/>
                <TextBox height="200px" width="500px"  name="About me!"/>
            </div>
        );
    }
}

export default App;