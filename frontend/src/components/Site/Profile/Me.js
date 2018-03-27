import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class Me extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      visiting: [],

    }
  }

  fetchProfile = (username) => {
    const { user } = this.state
    axios
    .get(`/users/profile/${username}`)
    .then(res => {
      this.setState({
        visiting: res.data.data[0]
      })
      this.props.setUser(this.props.username)
    })
    .catch(err => {
      console.log(`err fetching user profile`, err)
    })
  }

  componentDidMount(){
   this.fetchProfile(this.props.username);
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.username !== this.props.username) {
      this.fetchProfile(nextProps.username)
    } 
  }
  
 

  render(){
    const { user, logOut, setUser } = this.props;
    const { visiting } = this.state;

    return(
      <div id="profile">
        <div id="profile-info">
          <img id="profile-pic" src={visiting.profilepic} />
          <h2>{visiting.username}</h2>
          <h3>{`level`}</h3>
          <h3>{visiting.email}</h3>
         {user ? user.id === visiting.id ? <Link to='/home'><button onClick={logOut}>Logout</button></Link> : <div></div> : <div></div>}
        </div>
        <div id="language-container">
          <h3>Languages</h3>
          <p>Language - <span class="dull">{`# years`}</span></p>
          <p>Language - <span class="dull">{`# years`}</span></p>
          <p>Language - <span class="dull">{`# years`}</span></p>
          <p>Language - <span class="dull">{`# years`}</span></p>
        </div>
        <div id="links-container">
          <h3>Links</h3>
          <Link to={`link`}>{`link`}</Link>
          <Link to={`link`}>{`link`}</Link>
        </div>
      </div>
    )
  }
}

export default Me;
