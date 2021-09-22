import React from 'react';
import './panel.css';
import Pgif from '../media/panelgif.gif';
import Pstatic from '../media/panelstatic.png';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: Pstatic,
            visible: '1'
        }
    }

    render() {

        const handleHover = () => {
            this.setState({
                media: Pgif,
                visible: '0'
            });
        }

        const handleUp = () => {
            this.setState({
                media: Pstatic
            });
        }

        return (
            <div className="panel-container">
                <div onMouseOver={handleHover} onMouseOut={handleUp} className="panel-img-container">
                    <img src={this.state.media} alt=""/>
                </div>
                <div className="panel-text-container">
                    <div className="panel-title">
                        opening up datasets
                    </div>
                    <div className="panel-desc">
                        Uscalt will open up access to datasets never available before by allowing users to sell their data in an open ecosystem. This will power the growth of AI, machine learning and businesses.
                        More datasets will be available to more people, levelling the playing field.
                    </div>
                    <div style={{opacity: this.state.visible}} className="hover-prompt">
                       ◀︎ Hover over me
                    </div>
                </div>
            </div>
        )
    }

}

export default Panel