import React, { Component } from 'react';
// import './main.module.css'
import GenericButton from './GenericButton';
import Example from './Nav';
import Profile from './Profile';
<<<<<<< HEAD
import TextBox from './TextBox';
import NavSection from './NavSection';
import Navbar from './Navbar';
=======
import 'bootstrap/dist/css/bootstrap.css';
import Example from './Nav';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
>>>>>>> 99cfbb2d812087f2ce9ab5ff2343f0884bcf767a


class App extends Component {
    render() {
        return ( 
            <div className = "App" >
                <Example/>
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