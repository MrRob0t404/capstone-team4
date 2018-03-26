import React from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';


class RegisterUser extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            username: '',
            password: '',
            verifyPassword: '',
            email: '',
            message: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegisterButton = e => {
        const { fullName, username, password, verifyPassword, email } = this.state;
        if (!fullName || !username, !password || !verifyPassword, !email) {
            this.setState({
                message: 'Please fill out all fields.'
            })
        } else if (username.length < 4 || password.length < 4) {
            this.setState({
                message: 'Username and Password must be at least 4 characters.'
            })
        } else if (password !== verifyPassword) {
            this.setState({
                message: 'Passwords do not match.'
            })
        } else {
            axios
                .post('/users/new', {
                    username: username,
                    password: password,
                    email: email,
                    fullName: fullName
                })
                .then(res => {
                    console.log(`res.data`, res.data)
                    this.setState({
                        username: '',
                        fullName: '',
                        email: '',
                        verifyPassword: '',
                        message: 'Registration Successful'
                    })
                })
                .catch(err => {
                    console.log(`error registering user`, err)
                    this.setState({
                        message: 'username already exists.'
                    })
                })
        }
    }




    render() {
        const { message, fullName, email, password, verifyPassword, username } = this.state
        console.log(`register state`, this.state)
        return (
            <div id="auth">
                <div id="auth-container">
                    <h2><Link to="/home"><i className="fas fa-code"></i></Link></h2>
                    <h2>TyroDev</h2>
                    <input name="fullName" placeholder="Full Name" type="text" onChange={this.handleInput} value={fullName} />
                    <input name="email" type="email" placeholder="email" onChange={this.handleInput} value={email} />
                    <input name="username" type="text" placeholder="username" onChange={this.handleInput} value={username} />
                    <input name="password" type="password" placeholder="password" onChange={this.handleInput} value={password} />
                    <input name="verifyPassword" type="password" placeholder="re-enter password" onChange={this.handleInput} value={verifyPassword} />
                    <p>{message}</p>
                    <button id="login" onClick={this.handleRegisterButton}>Register</button>
                    <p>{" "} Already a TyroDev member? <Link to='/login'> Login </Link></p>
                    <div className="divider"></div>
                    <p className="divider-label">or</p>
                    <button id="Oauth"><i class="fa fa-github" aria-hidden="true"></i><p>Login with Github</p></button>
                </div>
            </div>
        )
    }
}

export default RegisterUser


