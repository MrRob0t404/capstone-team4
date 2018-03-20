import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Auth extends Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div id="auth">
        <div id="auth-container">
          <h2><i class="fas fa-code"></i></h2>
          <h2>TyroDev</h2>
          <input placeholder="email"/>
          <input placeholder="password"/>
          <button id="login">Login</button>
          <div className="divider"></div>
          <p className="divider-label">or</p>
          <button id="Oauth"><i class="fa fa-github" aria-hidden="true"></i><p>Login with Github</p></button>
        </div>
      </div>
    )
  }
}

export default Auth
