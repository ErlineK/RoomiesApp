import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import About from './components/About/About';
import "./app.css";
import Bills from './components/Bills/Bills';
import GroupChat from './components/groupchat/GroupChat';
import Home from './home/home';
import Profile from './Profile';
import HouseList from './components/HouseList/houselist';


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
                    <NavLink activeClassName='active-page' to='/Bills'>
                        Bills
                        </NavLink>
                    <NavLink activeClassName='active-page' to='/GroupChat'>
                        GroupChat
                    </NavLink>
                </nav>

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route exact path='/Profile' component={Profile} />
                    <Route exact path='/About' render={() => <About name='Pugsy' city='London'/>} />
                    <Route exact path='/Bills' component={Bills} />
                    <Route exact path='/GroupChat' component={GroupChat} />
                    <Route exact path='/HouseList' component={HouseList} />
                </Switch>
            </div >
        );
    }
}

export default App;