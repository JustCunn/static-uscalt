import { React, useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './RoomBlock.css';

export default function RoomBlock(props) {
    const [blockWidth, setBlockWidth] = useState('20em');
    const [zdex, setZdex] = useState('1');
    const ref = useRef(null);

    const handleClick = () => {
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
    }

    return (
        <div style={blkWidth} className="room-container">
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
           <div className="block-room-permissions">
               <p>{props.name} is permitted to distribute the following</p>
                   <ul /*style={ulHeight}*/ ref={ref}>
                       <li>Data Type 1</li>
                       <li>Data Type 2</li>
                       <li>Data Type 3</li>
                       <li>Data Type 4</li>
                       <li>Data Type 5</li>
                   </ul>
            </div>
            <Link to={`/dashboard/rooms/${props.name}`} className="block-button-container">
                <div onClick={handleClick} className="block-button">
                    View More
                </div>
            </Link>
        </div>
    )
}