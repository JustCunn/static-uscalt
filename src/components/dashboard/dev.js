// Dev dashboard

import { React, useState, useEffect }from 'react';
import { Link } from "react-router-dom";
import './dev.css';

/*function DevModal(props) {
    useEffect(() => {
        console.log(props.name)
    })
    return (
        <div className="modal-background" style={{display: props.modalVisible ? 'flex' : 'none'}}>
            <div className="modal-card">
                <div className="modal-title-div">
                    <div className="modal-title">Manage {props.name}'s Room Links</div>
                    <div className="modal-close" onClick={() => props.setModalVisible(false)}>X</div>
                </div>
            </div>
        </div>
    )
}*/

function registerRoom(room_name, description, dev_name) {
    fetch("http://127.0.0.1:8000/api/registerroom/", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            "name": room_name,
            "brief_desc": description,
            "dev_name": dev_name
        })
    })
}

function AddRoom(props) {
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [devName, setDevName] = useState();

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value)
    }

    const handleDevNameChange = (e) => {
        setDevName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerRoom(name, desc, devName);
    }

    const addStyle = {
        display: props.see ? 'flex' : 'none'
    }

    return (
        <div className="add-link-wrapper" style={addStyle}>
            <p>Create a Room</p>
            <div className="manage-login-fields">
                <form onSubmit={handleSubmit}>
                    <div className="manage-field" id="manage-display-name">
                        <input type="text" className="manage-field-input" id="manage-display-name-input" 
                        placeholder="Room Name" value={name} onChange={handleNameChange}/>
                    </div>
                    <div className="manage-field" id="manage-display-name">
                        <input type="text" className="manage-field-input" id="manage-display-name-input" 
                        placeholder="Developer Name" value={devName} onChange={handleDevNameChange}/>
                    </div>
                    <div className="manage-field" id="manage-desc-name">
                        <input type="textarea" className="manage-field-input" id="manage-desc-input" 
                        placeholder="Description" value={desc} onChange={handleDescChange}/>
                    </div>
                    <div className="manage-submit">
                        <button onClick={() => props.setSee(false)} className="manage-submit-button" type="submit">Create</button>
                    </div>
                </form>
                <div className="manage-cancel" onClick={() => props.setSee(false)}>
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default function Dev() {
    const [rooms, setRooms] = useState([]) // Holds Room Data
    const [see, setSee] = useState(false); // Sets AddRoom modal visibility
    const [modalVisible, setModalVisible] = useState(false) // Sets Room Link "modal" visibility

    const getRooms = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/rooms/", {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Accept": "application/json",
            }
        })

        return data.json()
    }

    const LinkStyle = {
    }

    const test = () => {
        fetch("http://127.0.0.1:8000/api/test/", {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            }
        })
    }

    useEffect(() => {
        getRooms().then(data => setRooms(data))
    }, []);

    if (rooms === []) {
        return null
    }
    return (
        <div className="dev-wrapper">
            <div className="dev-room-wrapper">
                <AddRoom see={see} setSee={setSee}/>
                <div className="dev-room-title">
                    Manage Your Data Rooms
                </div>
                <div className="dev-room-table-wrapper">
                    <div className="dev-room-table-commands">
                        <p onClick={() => setSee(true)}>+</p>
                        <p>-</p>
                    </div>
                    <table className="dev-room-list">
                        <tbody>
                            <tr id="dev-room-table-header">
                                <th>Room Name</th>
                                <th>Description</th>
                                <th>Developer</th>
                            </tr>
                            {rooms.map((element, index) => (
                                    <tr key={index} className="sub-tr" onClick={() => setModalVisible(true)}>
                                        <td>
                                            <Link to={`/dashboard/room/${element.name}`} style={{'color': index%2===0 ? 'black' : 'white'}}>
                                                {element.name}
                                            </Link>
                                        </td>
                                        <td >{element.brief_desc}</td>
                                        <td >{element.dev_name}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

/////
