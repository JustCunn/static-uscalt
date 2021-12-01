import { React, useState, useEffect }from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import './ManageRoom.css';

async function registerLink(name, description, room) {
    return fetch("http://127.0.0.1:8000/api/link/register/", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "display_name": name,
            "desc": description,
            "room": room.toString()
        })
    })
    .then(data => data.json())
}

function AddLink(props) {
    const [displayName, setDisplayName] = useState();
    const [desc, setDesc] = useState();
    const [fields, setFields] = useState();

    const handleDNChange = (e) => {
        setDisplayName(e.target.value)
    }

    const handleDesc = (e) => {
        setDesc(e.target.value)
    }

    const handleFields = (e) => {
        setFields(e.target.value)
    }

    const handleSubmit = async e => {
        registerLink(displayName, desc, props.room);
    }

    const addStyle = {
        display: props.see ? 'flex' : 'none'
    }

    return (
        <div className="add-link-wrapper" style={addStyle}>
            <p>Add a Link to {props.name}</p>
            <div className="manage-login-fields">
                <form onSubmit={handleSubmit}>
                    <div className="manage-field" id="manage-display-name">
                        <input type="text" className="manage-field-input" id="manage-display-name-input" 
                        placeholder="Display Name" value={displayName} onChange={handleDNChange}/>
                    </div>
                    <div className="manage-field" id="manage-display-name">
                        <input type="text" className="manage-field-input" id="manage-display-name-input" 
                        placeholder="Fields" value={fields} onChange={handleFields}/>
                    </div>
                    <div className="manage-field" id="manage-desc-name">
                        <input type="textarea" className="manage-field-input" id="manage-desc-input" 
                        placeholder="Brief Description" value={desc} onChange={handleDesc}/>
                    </div>
                    <div className="manage-submit">
                        <button className="manage-submit-button" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function ManageRoom(props) {
    const [links, setLinks] = useState([])
    const [roomID, setRoomID] = useState()
    const [see, setSee] = useState(false)
    const { name } = useParams();
    const history = useHistory();

    const getRooms = async () => {
        await fetch(`http://127.0.0.1:8000/api/room/${name}`, {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        .then(data => data.json())
        .then(data => {
            setLinks(data.links);
            setRoomID(data.id)})
    }

    useEffect(() => {
        getRooms()
    }, []);

    return (
        <>
        <div className="modal-background">
            <div className="modal-card">
                <AddLink see={see} name={name} room={roomID}/>
                <div className="modal-title-div">
                    <div className="modal-header-wrapper">
                        <div className="modal-title">Manage {name}'s Room Links</div>
                        <div className="modal-close" onClick={() => history.push("../dev")}>X</div>
                    </div>
                    <div className="add-link" onClick={() => setSee(true)}>Add Link</div>
                    <table className="manage-room-list">
                        <tbody>
                            <tr id="manage-room-table-header">
                                <th>Room Name</th>
                                <th>Description</th>
                                <th>Users</th>
                            </tr>
                            {links.map((element, index) => (
                                    <tr /*key={index}*/ className="sub-tr">
                                        <td /*className="manage-rooms-ul-li"*/ >{element.display_name}</td>
                                        <td >{element.desc}</td>
                                        <td >{element.users.length}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

/*
<div className="login-field" id="login-email">
    <input type="text" name="email" className="login-field-input" id="login-email-input" 
    placeholder={this.state.register ? 'Email' : 'Email or Username'}/>
</div>
<div className="login-field" id="login-username">
    <input type="text" name="username" className="login-field-input" id="login-username-input" 
    placeholder="Username" value={0}/>
</div>
<div className="login-submit">
    <button className="login-submit-button" type="submit">Sign In</button>
</div>
*/