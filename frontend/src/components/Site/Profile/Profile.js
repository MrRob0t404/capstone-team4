import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Me from './Me';
import Issues from './ProfileIssues';
import Solutions from './ProfileSolutions';
import '../../.././CSS/Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentUserProfile: ''
    }
  }


  setCurrentUserProfile = (user) => {
    this.setState({
      currentUserProfile: user
    })
  }

  renderMyProfile = (props) => {
    const { logOut, user } = this.props;
    const { username } = props.match.params;
    return <Me user={user} logOut={logOut} username={username} setUser={this.setCurrentUserProfile}/>
  }
 

 renderIssuesPage = (props) => {
  const { user } = this.props;
  const { username } = props.match.params;
    return <Issues user={user} username={username} setUser={this.setCurrentUserProfile}/>
  } 


  renderSolutions = (props) => {
    const { user } = this.props;
    const { username } = props.match.params;
    return <Solutions username={username} user={user} setUser={this.setCurrentUserProfile} />
  }


  render () {
    const { user } = this.props
    const { currentUserProfile } = this.state
    console.log(`profile`, user)
   
    return (
      <div id="profile">
        <nav id="profile-nav">
          <Link to={`/profile/${currentUserProfile}`}>Me</Link>
          <Link to={`/profile/issues/${currentUserProfile}`}>Issues</Link>
          <Link to={`/profile/solutions/${currentUserProfile}`}>Solutions</Link>
        </nav>
        <Switch>
          <Route exact path='/profile/:username' component={this.renderMyProfile} />
          <Route path='/profile/issues/:username' component={this.renderIssuesPage} />
          <Route path='/profile/solutions/:username' component={this.renderSolutions} />
        </Switch>
      </div>
    )
  }
}

export default Profile;
