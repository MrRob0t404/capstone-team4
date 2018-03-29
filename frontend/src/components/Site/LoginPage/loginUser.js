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
      message: ' '
    }
  }


  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginButton = e => {
    e.preventDefault()
    const { username, password } = this.state;
    axios
      .post('/users/login', {
        username: username,
        password: password
      })
      .then(res => {
        this.props.setUser(res.data.user);
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
      <div className="auth" id="login">
        <div className="auth-container" id="login-container">
          <h2><Link to="/home"><i class="fas fa-code"></i></Link></h2>
          <h2>TyroDev</h2>
          <form>
            <input name="username" placeholder="username" type="text" onChange={this.handleInput} value={username}/>
            <input name="password" placeholder="password" type="password" onChange={this.handleInput} value={password}/>
            <input type="submit" className="auth-button" onClick={this.handleLoginButton} value="Login"/>
          </form>
          <p>{" "} Not a TyroDev member? <Link to='/register'> Sign up </Link></p>
          <p>{message}</p>
        </div>
      </div>
    )
  }
}

export default LoginUser;
