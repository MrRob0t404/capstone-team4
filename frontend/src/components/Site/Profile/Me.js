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

  componentDidMount(){
    axios
    .get(`/users/profile/${this.props.username}`)
    .then(res => {
      console.log(`new response`, res.data.data)
      this.setState({
        visiting: res.data.data[0]
      })
      this.props.setUser(this.props.username)
    })
    .catch(err => {
      console.log(`err fetching user profile`, err)
    })
  }


 

  render(){
    const { user, logOut } = this.props;
    const { visiting } = this.state;
    console.log(`me`, visiting)

    return(
      <div id="profile">
        <div id="profile-info">
          <img id="profile-pic" src={visiting.profilepic} />
          <h2>{visiting.username}</h2>
          <h3>{`level`}</h3>
          <h3>{visiting.email}</h3>
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
        <button onClick={logOut}>LOG OUT</button>
      </div>
    )
  }
}

export default Me;
