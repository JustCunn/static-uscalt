import React from 'react';
import './simple.css';
import Tgif from '../media/trangif.gif';
import Tstatic from '../media/transtatic.png';
import Mobile from '../media/mobile_transtatic.png';

class Simple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tranMedia: Tstatic
        }
    }
    
    render() {

        const handleHover = () => {
            this.setState({
                tranMedia: Tgif
            });
        }

        const handleUp = () => {
            this.setState({
                tranMedia: Tstatic
            });
        }

        return(
            <div className="simple-container">
                {/*<div onMouseOver={handleHover} onMouseOut={handleUp} className="img-container">
                    <img src={this.state.tranMedia} id='off' alt=""/>
        </div>*/}
                <div className="simple-text-container">
                    <div className="simple-title">
                        {this.props.title}
                    </div>
                    <div className="simple-desc">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }

}

export default Simple