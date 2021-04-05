import React from 'react';
import "./register.css";
import Email from "./email.js";
import Phone from "./media/phone.png";

class Info extends React.Component {
    render() {
        return (
            <div className="info" id="info">
                <div className="info-cont">
                    <div id="register">
                        Register your interest
                    </div>
                    <div id="register-info">
                        Submit your email below and we'll keep you up to date on the development of Uscalt and notify you when features go live.<br/>
                        We hope to have news on our development soon.
                    </div>
                    <Email/>
                </div>
                <div className="phone-cont">
                   <img src={Phone} alt="Phone with app panel menu" id="phone"/>
                </div>
            </div>
        )
    }
}

export default Info