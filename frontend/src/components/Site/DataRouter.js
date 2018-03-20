import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Issues from './Issues';
import Profile from './Profile/Profile';

class DataRouter extends Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div id="data">
        <nav id="global-nav">
          <i class="fas fa-code"></i>
          <div id="search">
            <input id="search-bar" placeholder="Search" />
            <button id="search-button"><i class="fas fa-search"></i></button>
          </div>
          <Link to="/issues">Issues</Link>
          <Link to="/profile"><i class="fas fa-user"></i></Link>
        </nav>
          <Redirect to="/home"/>
          <Switch>
          <Route path="/home" component={LandingPage} />
          <Route path="/issues" component={Issues} />
          <Route path="/profile" component={Profile} />
          </Switch>
      </div>
    )
  }
}

export default DataRouter
