import React from 'react';
import RoomBlock from './RoomBlock.js';
import './rooms.css';

export default function Rooms() {
    return (
        <div className="rooms-container">
            <div className="room-div-wrapper">
                <RoomBlock/>
                <RoomBlock/>
                <RoomBlock/>
                <RoomBlock/>
                <RoomBlock/>
            </div>
            {/*<a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=57dfbb766d0568310015">Click Here</a>*/}
        </div>
    )
}