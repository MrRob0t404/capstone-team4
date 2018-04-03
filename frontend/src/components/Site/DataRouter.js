import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import IssueRouter from './Issues/IssueRouter';
import Profile from './Profile/Profile';
import fulllogo from "../../Logos/full-logo.svg";


class DataRouter extends Component {
  constructor() {
    super();

  }

  handleLandingPage = () => {
    return (
      <LandingPage />
    )
  }

  handleIssues = () => {
    const { user, loading } = this.props;
    return (
      <IssueRouter user={user} loading={loading} />
    )
  }

  handleProfile = () => {
    const { user, logOut, loading } = this.props
    return <Profile user={user} logOut={logOut} />
  }

  render() {

    const { user } = this.props;

    return (
      <div id="data">
        <nav class="navbar">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <div>
                <img src={fulllogo} /><a class="navbar-brand" href="/home">TyroDev</a>
              </div>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-left">
                <li><Link to="/issues">Issues Feed</Link></li>
                <li><Link to="/issues/new">New Problem</Link></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                {!user ? <li><Link to="/login">Login</Link></li> : <li><p>Welcome, {user.username}!</p></li>}
                {!user ? <li className="sign-up-button"><Link to="/register">Sign Up</Link></li> : <li><Link to={`/profile/${user.username}`}>Profile</Link></li>}
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={this.handleLandingPage} />
          <Route path="/issues" component={this.handleIssues} />
          <Route path="/profile" component={this.handleProfile} />
        </Switch>
        <div id="footer">
          <i class="fa fa-github" aria-hidden="true"></i>
          <p><Link to="">Monique</Link> - <Link to="">Simon</Link> - <Link to="">Newton</Link> - <Link to="">Elon</Link> - <Link to="">Carlo</Link></p>
        </div>
      </div>
    )
  }
}

export default DataRouter



// if (loading) {
//   return <div>Loading User...</div>
// } else if (!user) {
//   return <Redirect to='/login' />
// } else {
//   return <Profile user={user} logOut={logOut} />
// }



// {user ? <Redirect to={`profile/${user.username}`}/><i class="fas fa-user"></i> : <Redirect to='/login'/><i class="fas fa-user"></i>}
