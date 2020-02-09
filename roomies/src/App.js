import React, { Component } from 'react';
// import './main.module.css'
import GenericButton from './GenericButton';
import Nav from './Nav';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.css';
import Example from './Nav';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


class App extends Component {
    render() {
        return ( 
            <div className = "App" >
                <Example/>
                <Profile/>
                <GenericButton name = "woof" buttonClass="button red"/>
            </div>
        );
    }
}

export default App;