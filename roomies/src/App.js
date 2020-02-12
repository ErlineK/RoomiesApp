import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import About from './About';
import GroupChat from './components/GroupChat';
import "./app.css";

// import './main.module.css'
// import GenericButton from './GenericButton';
// import Example from './Nav';
// import 'bootstrap/dist/css/bootstrap.css';
// import { NavLink } from 'reactstrap';
// import TextBox from './TextBox';
// import NavSection from './NavSection';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.css';
// import Example from './Nav';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


class App extends Component {
    render() {
        return (
            <div className="App" >
                <nav className='App-nav'>
                    <NavLink activeClassName='active-page' to='/Profile'>
                        Edit
                    </NavLink>
                    <NavLink activeClassName='active-page' to='/About'>
                        About
                    </NavLink>
                    <NavLink activeClassName='active-page' to='/GroupChat'>
                        GroupChat
                    </NavLink>
                </nav>

                <Switch>
                    <Route exact path='/Profile' component={Profile} />
                    <Route exact path='/GroupChat' component={GroupChat} />
                    <Route exact path='/About' render={() => <About name='Pugsy' city='London'/>} />
                </Switch>
            </div >
        );
    }
}

export default App;