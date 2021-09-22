import React from 'react';
import "./cover.css";
import Lines from "./media/ellipse2.png";

class Cover extends React.Component {
    render() {
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
                        AI and Machine Learning projects
                    </div>
                </div>
            </div>
        )
    }
}

export default Cover