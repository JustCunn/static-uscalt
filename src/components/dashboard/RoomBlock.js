// Room block component -> Used in the "Find and Manage Rooms" tab

import { React, useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './RoomBlock.css';

export default function RoomBlock(props) {
    const [blockWidth, setBlockWidth] = useState('20em');
    const [zdex, setZdex] = useState('1');
    const ref = useRef(null);

    /*const handleClick = () => {
        if (blockWidth === '20em') {
            setBlockWidth('65em');
            setZdex('4');
        }
        else {
            setBlockWidth('20em');
            setZdex('1');
        }
    }

    const blkWidth = {
        width: blockWidth,
        zIndex: zdex
    }*/

    const linkStyle = {
        textDecoration: 'none'
    }

    return (
        <div className="room-container">
           <div className="block-header">
               <div className="block-room-img">{/*Replace div with img block*/}</div>
               <div className="block-info-container">
                    <div className="block-room-name">
                        {props.name}
                    </div>
                    <div className="block-room-dev">
                        {props.developer}
                    </div>
               </div>
           </div>
            <Link to={`/dashboard/rooms/${props.name}`} style={linkStyle} className="block-button-container">
                <div className="block-button">
                    View More
                </div>
            </Link>
        </div>
    )
}