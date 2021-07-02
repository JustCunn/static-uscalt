import React from 'react';
import "./cover.css";
import Lines from "./media/ellipse2.png";
import Header from "./head.js";
import Footer from "./footer.js";
import Info from "./register.js";

class Cover extends React.Component {
    render() {
        return (
            <>
            <Header/>
            <div className="cover-container">
                <img src={Lines} alt="lines"/>
                <div className="cover-text">
                    <div className="cover-head">
                        working towards data <br/> sovereignty
                    </div>
                    <div className="cover-desc">
                        We're creating an easy-to-use platform for the Web3 Data Economy. Uscalt will allow users to authorise their data from online platforms
                        to be sold and receive a return on the sale. <br/><br/> Researchers will be able to harness data that was never available before, powering even stronger
                        AI and Machine Learning projects
                    </div>
                </div>
            </div>
            <Info/>
            <Footer/>
            </>
        )
    }
}

export default Cover