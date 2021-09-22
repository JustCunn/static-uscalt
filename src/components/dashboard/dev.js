import { React, useState, useEffect }from 'react';
import './dev.css';

function DevModal(props) {
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
}

export default function Dev() {
    const [rooms, setRooms] = useState(["HAHAH", "AHAHA"])
    const [modalVisible, setModalVisible] = useState(false)

    const getRooms = async () => {
        await fetch("http://127.0.0.1:8000/api/rooms/", {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        .then(data => data.json())
        .then(data => setRooms(data));
        rooms.forEach(element => console.log(element.name))
    }


    useEffect(() => {
        getRooms()
        console.log(modalVisible)
    }, []);

    return (
        <div className="dev-wrapper">
            <div className="dev-room-wrapper">
                <div className="dev-room-title">
                    Manage Your Data Rooms
                </div>
                <div className="dev-room-table-wrapper">
                    <div className="dev-room-table-commands">
                        <p>+</p>
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
                                <>
                                <tr className="sub-tr" onClick={() => setModalVisible(!modalVisible)}>
                                    <td /*className="dev-rooms-ul-li"*/ >{element.name}</td>
                                    <td>{element.brief_desc}</td>
                                    <td>{element.dev_name}</td>
                                </tr>
                                <DevModal key={index} modalVisible={modalVisible} setModalVisible={setModalVisible}
                                name={element.name}/>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}