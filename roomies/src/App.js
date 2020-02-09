import React, { Component } from 'react';
// import './main.module.css'
import GenericButton from './GenericButton';
import Nav from './Nav';
import Profile from './Profile';
import TextBox from './TextBox';
import NavSection from './NavSection';
import Navbar from './Navbar';


class App extends Component {
    render() {
        return ( 
            <div className = "App" >
                <Nav/>
                <Profile/>
                <GenericButton name="woof" buttonClass="button red"/>
                <TextBox height="200px" width="500px" name="About me!"/>
                <TextBox height="50px" width="500px" name="Enter your name!"/>
                <NavSection name="link1"/>
                <Navbar size={4} sec1="section1" sec2="section2" sec3="section3"/>
            </div>
        );
    }
}

export default App;