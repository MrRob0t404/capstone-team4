import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Me from './Me';
import Issues from './Issues';
import Solutions from './Solutions';

class Profile extends React.Component {
  constructor() {
    super()
  }

  render () {
    return (
      <div>
        <nav id="profile-nav">
          <Link to="/profile">Me</Link>
          <Link to="/profile/issues">Issues</Link>
          <Link to="/profile/solutions">Solutions</Link>
        </nav>
        <Switch>
          <Route exact path='/profile' component={Me} />
          <Route path='/profile/issues' component={Issues} />
          <Route path='/profile/solutions' component={Solutions} />
        </Switch>
      </div>
    )
  }
}

export default Profile;
