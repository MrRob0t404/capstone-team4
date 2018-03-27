import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import IssueRouter from './Issues/IssueRouter';
import Profile from './Profile/Profile';


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
    if (loading) {
      return <div>Loading User...</div>
    } else if (!user) {
      return <Redirect to='/login' />
    } else {
      return <Profile user={user} logOut={logOut} />
    }
  }

  render() {
    console.log(`dataRouter`, this.props.user)
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
              <a class="navbar-brand" href="/home">TyroDev</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-left">
                <li><Link to="/issues/open">Issues</Link></li>
                <li><Link to="/issues/new">New</Link></li>
                <li><Link to={user ? `/profile/${user.username}` : '/profile'}>Profile</Link></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
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
          <p>Monique - Simon - Newton - Elon - Carlo</p>
        </div>
      </div>
    )
  }
}

export default DataRouter
