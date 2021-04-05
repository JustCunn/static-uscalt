import React from "react";
import Logo from './media/logo.png';
import "./footer.css"

class Footer extends React.Component {
    render() {
        return (
            <div className="footer-container">
                <div className="contact">
                    <div className="social">
                        <a href="https://twitter.com/UscaltData" className="fa fa-twitter"></a>
                        <a href="https://www.facebook.com/Uscalt-112539087602951" className="fa fa-facebook"></a>
                        <a href="https://www.linkedin.com/company/76784252/" className="fa fa-linkedin"></a>
                    </div>
                    <div className="foot-email">
                        <a href="mailto:info@uscalt.com">info@uscalt.com</a>
                    </div>
                </div>
                <div className="foot-logo-container">
                    <img src={Logo} alt="Uscalt logo"/>
                </div>
            </div>
        )
    }
}

export default Footer