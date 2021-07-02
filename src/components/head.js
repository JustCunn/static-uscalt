import React from 'react';
import Logo from "./media/logo.png";
import "./head.css";
import Ham from './ham.js';
import Hamnav from './hamnav.js';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: ""
        }
    }

    handleError = () => {
        localStorage.removeItem('token');
    }

    checkForLogin = () => {
        if (localStorage.getItem('token') !== null) {
            fetch("http://127.0.0.1:8000/api/profile/", {
                method: "GET",
                headers: {
                    "Authorization": `token ${localStorage.getItem('token')}`
                }
            })
            .then(data => data.json())
            .catch(err => this.handleError())
            .then(data => this.setState({username: data.username}))
            //console.log(this.state.username)
            return <div className="inform-text">{this.state.username}</div>
        }
        else {
            return <div className="inform-text">Sign In</div>
        }
    }

    handleOpenChange = (e) => {
        this.setState({open: e})
    }
    render() {

        const NavStyle = {
            textDecoration: 'None'
        }

        return (
            <>
                <Hamnav onOpenChange={this.handleOpenChange} open={this.state.open}/>
                <div className="header-container">
                    <div className="logo-container">
                        <img src={Logo} alt="Uscalt Logo"/>
                    </div>
                    <div className="ham-div" onClick={this.handleClick}>
                        <Ham onOpenChange={this.handleOpenChange} open={this.state.open}/>
                    </div>
                    <nav>
                        <ul className="nav-links">
                            <Link to="/" style={NavStyle}><li className="nav-link">Home</li></Link>
                            <Link to="/developers" style={NavStyle}><li className="nav-link">Developers</li></Link>
                            <Link to="/about" style={NavStyle}><li className="nav-link">About</li></Link>
                            <Link to="/announcements" style={NavStyle}><li className="nav-link">Announcements</li></Link>
                        </ul>
                    </nav>
                    <div className="inform-container">
                        <div className="inform-button">
                        <Link style={NavStyle} to="/dashboard/home">
                            <div className="inform-text">
                                {this.checkForLogin()}
                            </div>
                        </Link>
                        </div>
                    </div>
                    <div className="inform-container">
                        <a href="/#info" className="inform-button">
                            <div className="inform-text">
                                Apply
                            </div>
                        </a>
                    </div>
                </div>
            </>
        )
    }
}

export default Header