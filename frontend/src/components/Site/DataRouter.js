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
        <nav id="global-nav">
          <Link to="/home"><i class="fas fa-code"></i></Link>
          <div id="search">
            <input id="search-bar" placeholder="Search" />
            <button id="search-button"><i class="fas fa-search"></i></button>
          </div>
          <Link to="/issues/open">Issues</Link>
          <Link to={user ? `/profile/${user.username}` : '/profile'}><i class="fas fa-user"></i></Link>
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
