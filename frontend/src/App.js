import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginUser from './components/Site/LoginPage/loginUser';
import RegisterUser from './components/Site/LoginPage/registerUser';
import DataRouter from './components/Site/DataRouter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      active: false
    }
  }


// functions passed as Props

isActive = () => {
  this.setState({
    active: !this.state.active
  });
};


UserFound = user => {
  this.setState({
    user: user
  });
};

logOut = () => {
  axios
    .get("/users/logout")
    .then(res => {
      this.setState({
        active: false
      });
    })
    .catch(err => {
      console.log(err);
    });
};


componentDidMount() {
  const { user } = this.state;
  axios
    .get("/users/getUser")
    .then(res => {
      console.log("THIS IS A RESPONSE" , res)
      this.setState({
        user: res.data.user,
        active: true
      });
    })
    .catch(err => {
      console.log(`errrr`, err);
    });
}




// Components
  handleLoginUser = () => {
    return (
      <LoginUser active={this.isActive} setUser={this.UserFound}/>
    )
  }


  handleRegisterUser = () => {
    return (
      <RegisterUser active={this.isActive} setUser={this.UserFound} />
    )
  }


  handleDataRouter = () => {
    const { user } = this.state
    return (
      <DataRouter user={user} active={this.isActive} logOutButton={this.logOut}/>
    )
  }


  render() {
    const { user, active } = this.state
    console.log(`App.js state`, this.state)
    return ( 
      <div>
        <Switch>
          <Route path="/login" component={this.handleLoginUser} />
          <Route path='/register' component={this.handleRegisterUser} />
          <Route path='/' component={this.handleDataRouter} />
        </Switch>
      </div>
    )
  }
}

export default App;
