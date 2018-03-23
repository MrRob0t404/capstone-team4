import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import '../../../CSS/Auth.css';


class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
    }
  }


  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginButton = e => {
    const { username, password } = this.state;
    axios
      .post('/users/login', {
        username: username,
        password: password
      })
      .then(res => {
        console.log(`this is res.data`, res.data);
        this.props.setUser(res.data);
        this.props.active();
        this.setState({
          username: '',
          password: '',
          message: 'Success!'
        })
      })
      .catch(err => {
        console.log(`error in login button`,err)
        this.setState({
          username: '',
          password: '',
          message: 'Username / Password is incorrect'
        })
      })
  }



  render() {
    const { message, username, password } = this.state
    return (
      <div id="auth">
        <div id="auth-container">
          <h2><Link to="/home"><i class="fas fa-code"></i></Link></h2>
          <h2>TyroDev</h2>
          <input name="username" placeholder="username" type="text" onChange={this.handleInput} value={username}/>
          <input name="password" placeholder="password" type="password" onChange={this.handleInput} value={password}/>
          <button id="login" onClick={this.handleLoginButton}>Login</button>
          <p>{message}</p>
          <p>{" "} Not a TyroDev member? <Link to='/register'> Sign up </Link></p>
          <div className="divider"></div>
          <p className="divider-label">or</p>
          <button id="Oauth"><i class="fa fa-github" aria-hidden="true"></i><p>Login with Github</p></button>
        </div>
      </div>
    )
  }
}

export default LoginUser;

