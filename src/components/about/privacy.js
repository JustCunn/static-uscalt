import React from 'react';
import './privacy.css';
import Secure from '../media/secure.png';

class Privacy extends React.Component {

    render() {
        return (
            <div className="privacy-container">
                <div className="privacy-text-container">
                    <div className="privacy-title">
                        Privacy
                    </div>
                    <div className="privacy-desc">
                        The privacy of users is vital to us and is one of the biggest elements we think about during development. We will never
                        use datasets that contain identifiable personal information and where possible, leave the data on users' devices.
                    </div>
                </div>
                <div className="privacy-img-container">
                    <img src={Secure} alt=""/>
                </div>
            </div>
        )
    }

}

export default Privacy