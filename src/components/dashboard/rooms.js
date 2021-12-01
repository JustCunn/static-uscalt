import { React, useState, useEffect } from 'react';
import RoomBlock from './RoomBlock.js';
import './rooms.css';

export default function Rooms() {
    const [rooms, setRooms] = useState([])

    const getRooms = async () => {
        await fetch("http://127.0.0.1:8000/api/allrooms/", {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        .then(data => data.json())
        .then(data => {
            setRooms(data)
            console.log(data)
        });
    }


    useEffect(() => {
        getRooms()
    }, []);

    return (
        <div className="rooms-container">
            <div className="room-div-wrapper">
                {rooms.map((item, index) => (
                    <RoomBlock key={index} name={item.name} developer={item.dev_name} room_id={item.id}/>
                ))}
            </div>
            {/*<a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=57dfbb766d0568310015">Click Here</a>*/}
        </div>
    )
}