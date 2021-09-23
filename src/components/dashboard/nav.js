import { React, useEffect, useState } from "react";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import Switch from "react-switch";

import "./nav.css";


export default function Nav(props) {
    const [username, setUsername] = useState("");
    const [userClick, setUserClick] = useState(false);  //State for click on user profile
    const [currentNav, setCurrentNav] = useState(null); //state for which option is 'active'

    let history = useHistory();

    const handleClick = () => {
        setUserClick(!userClick) //Toggles state
    }

    const handleLogout = () => {            //Logs user out and pushes to Home Page
        localStorage.removeItem('token')
        history.push('/')
        props.setToken("")
        localStorage.removeItem('token')
    }

    const optionStyle = {                   //Controls user settings menu visibility on screen
        left: userClick ? '100%' : '0%',
        //opacity: userClick ? '1' : '0'
    }

    const isClickedStyleHome = {
        backgroundColor: (currentNav === 'home') ? 'white' : null,
        color: (currentNav === 'home') ? '#004d81' : null
    }

    const isClickedStyleTransactions = {
        backgroundColor: (currentNav === 'transactions') ? 'white' : null,
        color: (currentNav === 'transactions') ? '#004d81' : null
    }

    const isClickedStylePreferences = {
        backgroundColor: (currentNav === 'preferences') ? 'white' : null,
        color: (currentNav === 'preferences') ? '#004d81' : null
    }

    const isClickedStyleRooms = {
        backgroundColor: (currentNav === 'rooms') ? 'white' : null,
        color: (currentNav === 'rooms') ? '#004d81' : null
    }

    const isClickedStyleSearch = {
        backgroundColor: (currentNav === 'search') ? 'white' : null,
        color: (currentNav === 'search') ? '#004d81' : null
    }

    const isClickedStyleDev = {
        backgroundColor: (currentNav === 'dev') ? 'white' : null,
        color: (currentNav === 'dev') ? '#004d81' : null
    }

    const getUsername = async () => {
        //Fetches username from server
        await fetch("http://127.0.0.1:8000/api/profile/", {
                method: 'GET',
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
            })
            .then(data => data.json())
            .then(data => setUsername(data.username))
    }

    useEffect(() => {
        getUsername();
    })

        return (
            <div className="nav-container">
                <div className="nav-user-container" onClick={handleClick}>
                    {username}
                </div>
                <div className="nav-user-options-container" style={optionStyle}>
                    <div className="nav-user-options-option" id="nav-user-options-logout" onClick={handleLogout}>
                        Sign Out
                    </div>
                    <div className="nav-user-options-option" id="nav-user-options-theme">
                        <Switch onChange={props.onClick} checked={props.darkMode}/>
                    </div>

                </div>
                <div className="dash-nav-links">
                    <ul className="nav-links-ul">
                        <li id="nav-li-home">
                            <Link to="/dashboard/home" onClick={() => setCurrentNav('home')} style={isClickedStyleHome}
                            className="dash-nav-link">Home</Link>
                        </li>
                        <hr></hr>
                        <p className="nav-room-header">Data Rooms</p>
                        <li id="nav-li-rooms">
                            <Link to="/dashboard/rooms/manage" onClick={() => setCurrentNav('rooms')} style={isClickedStyleRooms}
                            className="dash-nav-link">Manage My Active Rooms</Link>  
                        </li>
                        {/*<li id="nav-li-search">
                            <Link to="/dashboard/home" onClick={() => setCurrentNav('search')} style={isClickedStyleSearch}
                            className="dash-nav-link">Find Data Rooms</Link> 
        </li>*/}
                        <hr></hr>
                        <li id="nav-li-transactions">
                            <Link to="#" onClick={() => setCurrentNav('transactions')} style={isClickedStyleTransactions}
                            className="dash-nav-link">Transactions</Link>
                        </li>
                        <hr></hr>
                        <li id="nav-li-preferences">
                            <Link to="#" onClick={() => setCurrentNav('preferences')} style={isClickedStylePreferences}
                            className="dash-nav-link">Preferences</Link>
                        </li>
                        <li id="nav-li-dev">
                            <Link to="/dashboard/dev" onClick={() => setCurrentNav('dev')} style={isClickedStyleDev}
                            className="dash-nav-link">Developer Tools</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
}