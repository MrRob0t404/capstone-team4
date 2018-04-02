import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import EditProfile from './EditProfile';

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      visiting: [],
      message: '',
      submitted: false,
      fullname: '',
      username: '',
      email: '',
      stack: '',
      profilepic: ''
    }
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount() {
    this.fetchProfile(this.props.username);
  }

  //this.state.user => {user: null, logOut: ƒ, username: "MoMo", setUser: ƒ}
  //this.state.visiting 
  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.fetchProfile(nextProps.username)
    }
    this.setState({
      user: nextProps,
      submitted: false
    })
    console.log("componentwillreceiveprops user", this.state.visiting)
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    axios
      .patch('/users/profile/edit', {
        "email": 'random@email.com',
        "fullName": 'newName',
        "profilepic": 'https://pmcvariety.files.wordpress.com/2016/05/spongebob-nickelodeon.jpg?w=1000&h=563&crop=1',
        "stack": 'randomstuff',
        "username": 'spongebob',
      })
      .then(() => {
          this.setState({
            message: "YEAH"
          })
      })
      .catch(err => {
        console.log(`err fetching user profile`, err)
      })
    this.setState({
      submitted: true
    })
  }

  handleClick = () => {
    const { user } = this.state
    console.log("user", user.user.profilepic)
    this.setState({
      submitted: true,
      username: user.user.username,
      fullname: user.user.fullname, 
      email: user.user.email,
      profilepic: user.user.profilepic
    })
  }



  renderEditProfile = () => {
    const { user, visiting, username, fullname, email, stack, profilepic } = this.state
    const { logOut } = this.props
    // console.log("handleClick user", user.user)
      // console.log("this.state", this.state)
      console.log("profilePic", user)


    // return(<EditProfile user={user}/>)
    return (
      <div>
        <div id="profile">
        <form>
          <div id="profile-info">
            <img id="profile-pic" src={profilepic} />
              <h2>
                Username: {" "}
                <input
                  name="username"
                  type="username"
                  value={username}
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
              <Link to={`link`}>{`link`}</Link>
              <Link to={`link`}>{`link`}</Link>
            </div>
            <div>
              <button onSubmit={this.handleSubmit}>Submit Changes</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    )
  }

  renderUserProfile = () => {
    const { user, logOut, setUser } = this.props;
    const { visiting, submitted } = this.state;

    return (
      <div id="profile">
        <div id="profile-info">
          <img id="profile-pic" src={visiting.profile_pic} />
          <h2>{visiting.username}</h2>
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
          <Link to={`link`}>{`link`}</Link>
          <Link to={`link`}>{`link`}</Link>
        </div>
        <div>
          <button onClick={this.handleClick}>Edit Profile</button>
        </div>
      </div>
    )
  }

  render() {
    const { user, logOut, setUser } = this.props;
    const { visiting, submitted } = this.state;
    // console.log("user", user)
    // console.log("visiting", visiting)

    if (!submitted) {
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
