// Manage Room modal

import { React, useState, useEffect }from 'react';
import { useParams, useHistory } from "react-router-dom";
import './ManageRoom.css';

async function registerLink(name, description, fields, room, off_id, cloud, urll) {
    return await fetch("http://192.168.0.3:8000/api/link/register/", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "display_name": name,
            "desc": description,
            "room": room.toString(),
            "off_id": off_id,
            "url": urll,
            "cloud": cloud,
            "fields": fields
        })
    })
    .then(data => data.json())
}

function AddLink(props) {
    const [displayName, setDisplayName] = useState();
    const [desc, setDesc] = useState();
    const [fields, setFields] = useState();
    const [urll, setUrl] = useState();
    const [checked, setChecked] = useState(false);
    const [needed, setNeeded] = useState(false);

    const handleDNChange = (e) => {
        setDisplayName(e.target.value)
    }

    const handleDesc = (e) => {
        setDesc(e.target.value)
    }

    const handleFields = (e) => {
        setFields(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerLink(displayName, desc, fields, props.room, checked, needed, urll);
    }

    const handleCheck = () => {
        setChecked(!checked);
    };

    const handleUrl = (e) => {
        setUrl(e.target.value)
    }

    const addStyle = {
        display: props.see ? 'flex' : 'none'
    }

    const checkStyle = {
        backgroundColor: checked ? 'green' : 'white',
    }

    const divStyle = {
        display: needed ? 'none' : 'flex'
    }

    const div2Style = {
        display: checked ? 'none' : 'flex'
    }

    const needStyle = {
        backgroundColor: needed ? 'green' : 'white'
    }

    const urlStyle= {
        display: (checked || needed) ? 'flex' : 'none',
        //display: needed ? 'flex' : 'none',
    }

    return (
        <div className="add-link-wrapper" style={addStyle}>
            <p>Add a Link to {props.name}</p>
            <div className="manage-login-fields">
                <form onSubmit={handleSubmit}>
                    <div className="manage-field" id="manage-display-name">
                        <label for="displayname">Display Name. This will be visible to all Uscalt users.</label>
                        <input type="text" className="manage-field-input" id="manage-display-name-input" 
                        placeholder="Display Name" value={displayName} onChange={handleDNChange}/>
                    </div>
                    <div className="manage-field" id="manage-display-name">
                        <label for="fields">The field header for your data file. This will be the table header for all created datasets</label>
                        <input type="text" className="manage-field-input" id="manage-display-name-input" 
                        placeholder="Fields" value={fields} onChange={handleFields}/>
                    </div>
                    <div className="manage-field" id="manage-desc-name">
                        <label for="desc">Brief description of the data collected</label>
                        <input type="textarea" className="manage-field-input" id="manage-desc-input" 
                        placeholder="Brief Description" value={desc} onChange={handleDesc}/>
                    </div>
                    <div className="manage-check" style={divStyle}>
                        <div type="checkbox" id='add-check' style={checkStyle} checked={checked} onClick={() => setChecked(!checked)}/>
                        <div>Manage the data retireval process on your own server for extra security. See Server-Side Library.</div>
                    </div>
                    <div className="manage-check" style={div2Style}>
                        <div type="checkbox" id='add-check' style={needStyle} checked={needed} onClick={() => setNeeded(!needed)}/>
                        <div>Use data from cloud database (not local devices). See Server-Side Library.</div>
                    </div>
                    <div style={urlStyle} className="manage-field" id="manage-url">
                        <input type="text" className="manage-field-input" id="manage-url-input" 
                        placeholder="Base URL of your server" value={urll} onChange={handleUrl}/>
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
    const [delMode, setDelMode] = useState(false)
    const { name } = useParams();
    const history = useHistory();

    const getRooms = async () => {
        await fetch(`http://127.0.0.1:8000/api/getroom/${name}/`, {
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

    const deleteLink = async (id) => {
        const response = await fetch(`http://127.0.0.1:8000/api/room/${id}/`, {
                            method: 'DELETE',
                            headers: {
                                "Authorization": `Token ${localStorage.getItem("token")}`
                            }
                        })
    }

    useEffect(() => {
        getRooms()
    }, []);

    const addStyle = {
        display: delMode ? 'none' : 'flex'
    }

    const modalStyle = {
        overflow: see ? 'hidden' : 'scroll'
    }

    return (
        <>
        <div className="modal-background">
            <div className="modal-card" style={modalStyle}>
                <AddLink see={see} name={name} room={roomID}/>
                <div className="modal-title-div">
                    <div className="modal-header-wrapper">
                        <div className="modal-title">Manage {name}'s Room Links</div>
                        <div className="modal-close" onClick={() => history.push("../dev")}>X</div>
                    </div>
                    <div className="link-settings">
                        <div className="add-link" style={addStyle} onClick={() => setSee(true)}>Add Link</div>
                        <div className="add-link" id="remove-link" onClick={() => setDelMode(!delMode)}>
                            {delMode ? 'Cancel' : 'Remove Link'}
                        </div>
                    </div>
                    {delMode ? null : (<table className="manage-room-list">
                        <tbody>
                            <tr id="manage-room-table-header">
                                <th>Room Name</th>
                                <th>Description</th>
                                <th>Users</th>
                            </tr>
                            {links.map((element, index) => (
                                    <tr key={index} className="sub-tr">
                                        <td /*className="manage-rooms-ul-li"*/ >{element.display_name}</td>
                                        <td >{element.desc}</td>
                                        <td >{element.users.length}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>)}
                    {delMode ? (
                            links.map((element, index) => { return (
                                    <div className="del-item-container" onClick={() => deleteLink(element.id)}>
                                        {element.display_name}
                                    </div>
                    )})) : null}
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