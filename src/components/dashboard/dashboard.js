import React from 'react';
import './dashboard.css';
import Nav from "./nav.js";
import Home from "./home.js";
import Rooms from './rooms.js';
import Login from "../login/login.js";
import RoomPage from "./components/RoomPage.js";
import Dev from "./dev.js";
import Decrypt from "./decrypt.js";
import ManageRoom from "./ManageRoom.js";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.isAuthed ? 
        (<Login setToken={this.props.setToken}/>) :
        (
            <>
            <div className="dash-container">
                <div className="dash-nav-container">
                    <Nav onClick={this.props.onClick} darkMode={this.props.darkMode} setToken={this.props.setToken}/>
                </div>
                <div className="dash-other-container">
                    <Switch>
                        <Route path='/dashboard/home' component={(props) => (<Home darkMode={this.props.darkMode}/>)}/>
                        <Route path='/dashboard/rooms/manage' exact component={Rooms}/>
                        <Route path='/dashboard/rooms/:id' exact component={RoomPage}/>
                        <Route path='/dashboard/dev' exact component={Dev}/>
                        <Route path='/dashboard/decrypt' exact component={Decrypt}/>
                        <Route path='/dashboard/room/:name' exact component={ManageRoom}/>
                    </Switch>
                </div>
            </div>
            </>
        )
    }
}

export default Dashboard