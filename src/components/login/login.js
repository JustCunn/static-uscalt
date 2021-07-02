import React from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import axios from 'axios';
import './login.css';

async function loginUser(username, password) {
    return fetch("http://127.0.0.1:8000/api/login/", {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    .then(data => data.json())
}

async function registerUser(email, username, password) {
    return fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })
    })
    .then(data => data.json())
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            sToken: "",
            register: false
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        if (this.state.register == false) {
            /*const Url = "http://127.0.0.1:8000/api/login/"
            const user={
            "username": this.state.email,
            "password": this.state.password
            }
            console.log(user)

            axios({
                method: 'post',
                url: Url,
                data: user,
                config: {headers: {'content-type': 'application/json'}}
            })
            .then(data=>console.log(data))
            .catch(err=>console.log(err))*/
            const token = await loginUser(this.state.email, this.state.password)
            console.log(token.token)
            this.props.setToken(token.token)
        }
        else if (this.state.register == true) {
            /*const Url = "http://127.0.0.1:8000/api/register/"
            const user={
            "email": this.state.email,
            "password": this.state.password,
            "username": this.state.username
            }
            console.log(user)

            axios({
                method: 'post',
                url: Url,
                data: user,
                config: {headers: {'content-type': 'application/json'}}
            })
            .then(data=>console.log(data))
            .catch(err=>console.log(err))*/
            const token = await registerUser(this.state.email, this.state.username, this.state.password);
            console.log(token.token);
            this.props.setToken(token.token);
        }
        
    }

    handleClick = () => {
        this.setState({register: !this.state.register})
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})
    }

    render() {

        const loginStyle = {
            height: this.state.register ? '30em' : '25em'
        }

        const usernameStyle = {
            transition: 'all 0.2s ease-in-out',
            opacity: this.state.register ? '1' : '0',
            height: this.state.register ? '5em' : '0',
            display: 'block',
            zIndex: '4',
            marginBottom: '1.5em'
        }

        const registerStyle = {
            transition: 'all 0.2s ease-in-out',
            transform: this.state.register ? 'translateY(2.5em)' : ''
        }

        return (
            <div className="login-container">
                <div className="login-div" style={loginStyle}>
                    <div className="login-title">
                        {this.state.register ? 'Create an Account' : 'Welcome Back'}
                    </div>
                    <div className="login-fields">
                        <form onSubmit={this.handleSubmit}>
                            <div className="login-field" id="login-email">
                                <input type="text" name="email" className="login-field-input" id="login-email-input" 
                                placeholder={this.state.register ? 'Email' : 'Email or Username'} value={this.state.email} onChange={this.handleEmailChange}/>
                            </div>
                            <div className="login-field" id="login-username" style={usernameStyle}>
                                <input type="text" name="username" className="login-field-input" id="login-username-input" 
                                placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
                            </div>
                            <div className="login-field" id="login-password">
                                <input type="password" name="password" className="login-field-input" id="login-password-input" 
                                placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <div className="login-submit">
                                <button className="login-submit-button" type="submit">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="register-div" style={registerStyle}>
                    <span onClick={this.handleClick} >{this.state.register ? "Login with an existing account" : 'Register an Account'}</span>
                </div>
            </div>
        )
    }
}

export default Login