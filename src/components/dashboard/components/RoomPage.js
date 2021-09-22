import { React , useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RoomPage.css';

function LinkManageItem(props) {

    const toggleLink = () => {
        if (props.uData.includes(props.link_id)) {
            const array = props.uData;
            const index = array.indexOf(props.link_id);

            array.splice(index, 1);
            console.log(array)

            fetch("http://127.0.0.1:8000/api/user/14/", {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    "mylinks": array,
                })
            })
            .then(() => props.setLinks(array))
        }
        else {
            const array = props.uData;

            array.push(props.link_id)

            fetch("http://127.0.0.1:8000/api/user/14/", {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    "mylinks": array,
                })
            })
            .then(() => props.setLinks(array))
        }
        console.log("click")
    }

    return (
        <div className="link-manage-container">
            <div className="link-manage-info">
                <div className="link-display-name">{props.name}</div>
                <div className="link-desc">{props.desc}</div>
            </div>
            <div className="link-toggle-container" onClick={toggleLink}>
                {props.uData.includes(props.link_id) ? 'Enabled' : 'Disabled'}
            </div>
        </div>
    )
}

export default function RoomPage(props) {
    const [info, setInfo] = useState([])
    const [links, setLinks] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [buy, setBuy] = useState(false)
    const { id } = useParams();

    async function fetchAPI() {

        await fetch(`http://127.0.0.1:8000/api/user/14/`)
                .then(data => data.json())
                .then(data => {
                    setUserData(data);
                    console.log(data);
                    setLinks(data.mylinks);
                });

        await fetch(`http://127.0.0.1:8000/api/room/${id}/`)
                .then(data => data.json())
                .then(data => setInfo(data))
                .then(() => setLoading(false));
    }

    const dataStyle = {
        backgroundColor: buy ? 'white' : '#004d81',
        color: buy ? '#004d81' : 'white'
    }

    const buyStyle = {
        color: buy ? 'white' : '#004d81',
        backgroundColor: buy ? '#004d81' : 'white'
    }

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-room-img">{/*Replace div with img block*/}</div>
                <div className="page-info-container">
                    <div className="page-room-name">
                        {info.name}
                    </div>
                    <div className="page-room-dev">
                        {info.dev_name}
                    </div>
                </div>
            </div>
            <div style={{marginBottom: '1em'}}>{info.brief_desc}</div>
            <div className="page-divide-div">
                <div className="page-dividers">
                    <div className="page-link" style={dataStyle} onClick={() => setBuy(false)}>Manage Data Sold by App</div>
                    <div className="page-buy" style={buyStyle} onClick={() => setBuy(true)}>Retrieve Data</div>
                </div>
                {isLoading ? null : (
                    buy ? null : (
                    info.links.map((item, index) => (
                        <LinkManageItem name={item.display_name} desc={item.desc} link_id={item.id} uData={links} setLinks={setLinks}/>
                    )))
                    )}
            </div>
        </div>
    )
}