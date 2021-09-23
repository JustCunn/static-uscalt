import React from 'react';
import "./cover.css";
import Lines from "./media/ellipse2.png";

class Cover extends React.Component {
    render() {

        const aStyle = {
            color: '#004d81'
        }

        return (
            <div className="cover-container">
                <img src={Lines} alt="lines"/>
                <div className="cover-text">
                    <div className="cover-head">
                        working towards data <br/> sovereignty
                    </div>
                    <div className="cover-desc">
                        We're creating an easy-to-use platform for a new Data Ecosystem. Uscalt will allow users to authorise their data from online platforms
                        to be sold and developers will be given the tools to participate. <br/><br/> Researchers will be able to harness data that was never available before, powering even stronger
                        AI and Machine Learning projects <br/><br/>We're also implementing federated learning, allowing data to stay on the users device. This includes
                        novel and <a style={aStyle} href="https://arxiv.org/pdf/1901.08755.pdf">promising techniques</a>.
                    </div>
                </div>
            </div>
        )
    }
}

export default Cover