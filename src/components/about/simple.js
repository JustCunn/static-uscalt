import React from 'react';
import './simple.css';
import Tgif from '../media/trangif.gif';
import TSact from '../media/transaction.png';
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
                <div onMouseOver={handleHover} onMouseOut={handleUp} className="img-container">
                    <img src={this.state.tranMedia} id='off' alt=""/>
                </div>
                <div className="img-container">
                    <img src={Mobile} id="on" alt=""/>
                </div>
                <div className="simple-text-container">
                    <div className="simple-title">
                        Simplicity
                    </div>
                    <div className="simple-desc">
                        Uscalt will be easy to use, allowing data to be distributed in just a few taps. There won't be any need for in-depth editing by the user
                    </div>
                </div>
            </div>
        )
    }

}

export default Simple