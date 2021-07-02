import { React , useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RoomPage.css';

export default function RoomPage(props) {
    const [data, setData] = useState('')
    const { id } = useParams();

    useEffect(() => {
        async function fetchAPI() {
            let response = await fetch(`http://127.0.0.1:8000/api/rooms/room/${id}`);
            response = await response.json();
            setData(response);
        }

        fetchAPI();
    }, [])

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-room-img">{/*Replace div with img block*/}</div>
                <div className="page-info-container">
                    <div className="page-room-name">
                        {data.name}
                    </div>
                    <div className="page-room-dev">
                        {data.dev_name}
                    </div>
                </div>
            </div>
            <div>{data.brief_desc}</div>
        </div>
    )
}