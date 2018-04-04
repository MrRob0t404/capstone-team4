import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      visiting: [],
      message: '',
      editing: false,
      fullname: '',
      username: '',
      email: '',
      stack: '',
      links: '',
      profilepic: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchProfile = (currentUsername) => {
    axios
      .get(`/users/profile/${currentUsername}`)
      .then(res => {
        const user = res.data.data[0]
        this.setState({
          visiting: user,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          profilepic: user.profile_pic,
          stack: user.stack,
          links: user.links
        })
        this.props.setUser(this.props.currentUsername)
      })
      .catch(err => {
        console.log(`err fetching user profile`, err)
      })
  }

  componentDidMount() {
    this.fetchProfile(this.props.currentUsername);
  }

  //this.state.user => {user: null, logOut: ƒ, username: "MoMo", setUser: ƒ}
  //this.state.visiting 
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUsername !== this.props.currentUsername) {
      this.fetchProfile(nextProps.currentUsername)
    }
    this.setState({
      user: nextProps,
      editing: false
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      visiting: { ...this.state.visiting, [e.target.name]: e.target.value },
      profilepic: this.state.profilepic
    });
  };

  handleSubmit(event) {
    const { user, email, fullname, stack, username, links } = this.state
    console.log(this.state)
    event.preventDefault();
    console.log("DID THE THING")
    axios
      .patch('/users/profile/edit', {
        email: email,
        fullName: fullname,
        username: username,
        stack: stack,
        links: links
      })
      .then(() => {
        this.setState({
          message: "YEAH",
          editing: false
        })
        // this.props.setUser(this.props.currentUsername)
      })
      .catch(err => {
        console.log(`err fetching user profile`, err)
      })
    console.log("message", this.state.message)
  }

  handleClick = () => {
    const { user } = this.state
    // console.log("momo", test)
    // let test = user.user.username + "XXXXXXXXX"
    this.setState({
      editing: true
    })
  }


  renderEditProfile = () => {
    const { user, visiting, username, fullname, email, stack, profilepic, links } = this.state
    console.log(this.state)
    const { logOut } = this.props
    // console.log("handleClick user", user.user)
    // console.log("this.state", this.state)
    let userLoggedInLinks = links ? links.split(', ') : ['']
    // return(<EditProfile user={user}/>)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div id="profile">
            <div id="profile-info">
              <img id="profile-pic" src={profilepic} />
              <h2>username: {username} </h2>
              <h2>fullname: {" "}
                <input
                  name="fullname"
                  type="fullname"
                  value={fullname}
                  onChange={this.handleInputChange}
                />
              </h2>
              <h3>{`level`}</h3>
              <h3>
                Email: {" "}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </h3>
              {user ? user.id === visiting.id ? <Link to='/home'><button onClick={logOut}>Logout</button></Link> : <div></div> : <div></div>}
              <div id="language-container">
                <h3>
                  Stack: {" "}
                  <input
                    type="stack"
                    name="stack"
                    value={stack}
                    onChange={this.handleInputChange}
                  />
                </h3>
              </div>
              <div id="links-container">
                <h3>Links</h3>
                <a href={userLoggedInLinks[0]}>GitHub</a>
                <a href={userLoggedInLinks[1]}>LinkedIn</a>
              </div>
              <div>
                <button type="submit">Submit Changes</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  renderUserProfile = () => {
    const { user, logOut, setUser } = this.props;
    const { visiting, editing } = this.state;
    // console.log("visiting links", visiting.links ? visiting.links.split(', ') : '')
    let userLinks = visiting.links ? visiting.links.split(', ') : ['']

    return (
      <div id="profile">
        <div id="profile-info">
          <img id="profile-pic" src={visiting.profile_pic} />
          <h2>username: {visiting.username}</h2>
          <h2>fullname: {visiting.fullname}</h2>
          <h3>{`level`}</h3>
          <h3>{visiting.email}</h3>
          {user ? user.id === visiting.id ? <Link to='/home'><button onClick={logOut}>Logout</button></Link> : <div></div> : <div></div>}
        </div>
        <div id="language-container">
          <h3>Stack</h3>
          <p>{visiting.stack}</p>
        </div>
        <div id="links-container">
          <h3>Links</h3>
          <a href={userLinks[0]}>GitHub</a>
          <a href={userLinks[1]}>LinkedIn</a>
        </div>
        <div>
          {user && user.id === visiting.id ? <button onClick={this.handleClick}>Edit Profile</button> : ''}
        </div>
      </div>
    )
  }

  render() {
    const { user, logOut, setUser } = this.props;
    const { visiting, editing } = this.state;
    // console.log("this.state !!!!!!!!", this.state)

    if (!editing) {
      return (
        this.renderUserProfile()
      )
    } else {
      return (
        this.renderEditProfile()
      )
    }

  }
}

export default Me;
