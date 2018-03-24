import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Me from './Me';
import Issues from './ProfileIssues';
import Solutions from './ProfileSolutions';
import '../../.././CSS/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
  }


  renderMyProfile = () => {
    const { logOut, user } = this.props
    return <Me user={user} logOut={logOut}/>
  }
 

 renderIssuesPage = () => {
  const { user } = this.props
    return <Issues user={user} />
  } 



  render () {
    const { user } = this.props
    console.log(`profile`, user)
   
    return (
      <div id="profile">
        <nav id="profile-nav">
          <Link to="/profile">Me</Link>
          <Link to="/profile/issues">Issues</Link>
          <Link to="/profile/solutions">Solutions</Link>
        </nav>
        <Switch>
          <Route exact path='/profile' component={this.renderMyProfile} />
          <Route path='/profile/issues' component={this.renderIssuesPage} />
          <Route path='/profile/solutions' component={Solutions} />
        </Switch>
      </div>
    )
  }
}

export default Profile;
