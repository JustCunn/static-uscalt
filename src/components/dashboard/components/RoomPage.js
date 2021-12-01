import { React , useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RoomPage.css';

let uid
//let userData
//let info

function download(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

function LinkManageItem(props) {

    const toggleLink = () => {
        if (props.uData.includes(props.link_id)) {
            const array = props.uData;
            const index = array.indexOf(props.link_id);

            array.splice(index, 1);

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

function LinkBuyItem(props) {

    const toggleLink = async () => {
        var fileDownload = require('js-file-download');
        console.log(props.buyers.includes(props.uid))
        if(!props.buyers.includes(props.uid)) {
            await fetch("http://127.0.0.1:8000/api/link/buy/", {
                method: 'POST',
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    "link": props.link_id,
                    "id": props.uid
                })
            })
        }
        else {
            const Res = await fetch(`http://127.0.0.1:8000/api/link/download/${props.link_id}/${props.uid}/`, {
                method: 'GET',
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    //"accept": "text/csv",
                },
            })
            //.then(data => fileDownload(data.body, 'filename.csv'))
            Res.blob().then(blob => download(blob))
        }
    }

    return (
        <div className="link-buy-container">
            <div className="link-buy-info">
                <div className="link-display-name">{props.name}</div>
                <div className="link-desc">{props.desc}</div>
            </div>
            <div className="link-toggle-container" onClick={toggleLink}>
                {props.buyers.includes(props.uid) ? "Download" : "Request Data"}
            </div>
        </div>
    )
}

export default function RoomPage(props) {
    const [info, setInfo] = useState([]);
    const [links, setLinks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [buy, setBuy] = useState(false);
    //const [uid, setUid] = useState();
    const { id } = useParams();

    async function fetchUID() {

        const result = await fetch("http://127.0.0.1:8000/api/profile/", {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "accept": "application/json",
            },
        })

        return result.json()
    }

    async function fetchUser() {

        const result = await fetch(`http://127.0.0.1:8000/api/user/${uid}/`)

        return result.json()
    }

    async function fetchRoom() {

        const result = await fetch(`http://127.0.0.1:8000/api/room/${id}/`)

        return result.json()
    }

    const dataStyle = {
        backgroundColor: buy ? 'white' : '#004d81',
        color: buy ? '#004d81' : 'white'
    }

    const buyStyle = {
        color: buy ? 'white' : '#004d81',
        backgroundColor: buy ? '#004d81' : 'white'
    }

    useEffect(async () => {
        uid = await fetchUID().then(data => data.id);
        const userResult = await fetchUser()
        const roomResult = await fetchRoom()
        setUserData(userResult)
        setInfo(roomResult)
        setLinks(userResult.mylinks)
        setLoading(false)
    }, [links])

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
                    buy ? (info.links.map((item, index) => (
                        <LinkBuyItem key={index} name={item.display_name} desc={item.desc} link_id={item.id} uData={links} uid={uid} setLinks={setLinks}
                                    buyers={item.buyers}/>
                    )))
                    : (
                    info.links.map((item, index) => (
                        <LinkManageItem key={index} name={item.display_name} desc={item.desc} link_id={item.id} uData={links} setLinks={setLinks}/>
                    )))
                    )}
            </div>
        </div>
    )
}